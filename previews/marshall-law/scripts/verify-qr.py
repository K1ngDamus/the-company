"""Verify lib/qr.mjs two ways: matrix equality against a reference encoder,
and an actual decode with OpenCV. Dev-only — not part of the shipped build.

Two controls matter here:
  • The reference is forced to BYTE mode. lib/qr.mjs is byte-only by design;
    the reference auto-selects alphanumeric for input like "A", which is a
    different (also correct) encoding and not a discrepancy to chase.
  • Every payload is decoded from the REFERENCE image too. OpenCV's detector
    is not perfectly reliable, so a decode failure only counts against us if
    the reference image decodes and ours does not.
"""
import json, subprocess, sys
import numpy as np, cv2, qrcode
from qrcode.util import QRData, MODE_8BIT_BYTE

EC = {'L': qrcode.constants.ERROR_CORRECT_L, 'M': qrcode.constants.ERROR_CORRECT_M,
      'Q': qrcode.constants.ERROR_CORRECT_Q, 'H': qrcode.constants.ERROR_CORRECT_H}

def render(matrix, size, scale=12, border=6):
    padded = np.ones((size + border*2, size + border*2), dtype=np.uint8)
    padded[border:border+size, border:border+size] = 1 - matrix
    return cv2.resize(padded*255, None, fx=scale, fy=scale, interpolation=cv2.INTER_NEAREST)

def decode(img):
    try:
        text, _, _ = cv2.QRCodeDetector().detectAndDecode(img)
        return text
    except Exception:
        return None

cases = json.loads(subprocess.check_output(['node', 'scripts/dump-qr.mjs']))
fails, matched, decoded_ok, ref_blind = [], 0, 0, 0

for i, c in enumerate(cases):
    ours = np.array([[int(ch) for ch in row] for row in c['matrix']], dtype=np.uint8)

    # --- reference encoder, same version, same mask, forced to byte mode ---
    q = qrcode.QRCode(version=c['version'], error_correction=EC[c['level']],
                      box_size=1, border=0, mask_pattern=c['mask'])
    q.add_data(QRData(c['content'].encode('utf-8'), mode=MODE_8BIT_BYTE))
    q.make(fit=False)
    ref = np.array(q.get_matrix(), dtype=np.uint8)

    if ref.shape != ours.shape:
        fails.append(f"{i} shape {ours.shape} vs reference {ref.shape}"); continue
    diff = int(np.count_nonzero(ref != ours))
    if diff:
        fails.append(f"{i} [{c['level']} v{c['version']} mask{c['mask']}] "
                     f"{diff} modules differ from reference")
    else:
        matched += 1

    # --- decode ours; use the reference image as the control ---
    mine = decode(render(ours, c['size']))
    if mine == c['content']:
        decoded_ok += 1
    else:
        theirs = decode(render(ref, c['size']))
        if theirs == c['content']:
            fails.append(f"{i} [{c['level']} v{c['version']}] OUR image failed to decode "
                         f"but the reference image decoded fine — got {str(mine)[:40]!r}")
        else:
            ref_blind += 1   # OpenCV could not read either image; not our defect

print(f"verify-qr: {len(cases)} cases ({len(set(c['content'] for c in cases))} payloads x 4 EC levels)")
print(f"  matrix identical to reference : {matched}/{len(cases)}")
print(f"  decoded back by OpenCV        : {decoded_ok}/{len(cases)}"
      + (f"  ({ref_blind} the decoder could not read from EITHER encoder)" if ref_blind else ""))
if fails:
    print(f"\n{len(fails)} failure(s):")
    for f in fails: print('  x ' + f)
    sys.exit(1)
print("verify-qr: PASS — every matrix matches the reference encoder, and every "
      "code OpenCV can read at all reads back correctly")
