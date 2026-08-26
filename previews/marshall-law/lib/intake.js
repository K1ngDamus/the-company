/**
 * /start/ — autosave and the answer summary.
 *
 * PROGRESSIVE ENHANCEMENT. Without this file the form still renders, still
 * fills in, and still prints. Everything here is convenience:
 *   • answers persist in this browser so a long form survives a closed tab
 *   • a "gather my answers" step produces text she can copy or email
 *
 * NOTHING LEAVES THE BROWSER. No fetch, no beacon, no third party. The only
 * storage is localStorage on her own device, which we cannot read.
 */
(function () {
  'use strict';
  var form = document.getElementById('intake');
  if (!form) return;

  var KEY = 'mlp-intake-v1';
  var bar = document.querySelector('[data-savebar]');
  var barText = document.querySelector('[data-savetext]');

  /* localStorage throws in private mode and when site data is blocked, and a
     thrown error here would take the whole form's enhancement down with it. */
  function safeGet() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  }
  function safeSet(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
  }

  function collect() {
    var data = {};
    form.querySelectorAll('[data-save]').forEach(function (el) {
      if (el.type === 'checkbox') {
        if (!el.checked) return;
        (data[el.name] = data[el.name] || []).push(el.value);
      } else if (el.type === 'radio') {
        if (el.checked) data[el.name] = el.value;
      } else if (el.value.trim()) {
        data[el.name] = el.value.trim();
      }
    });
    return data;
  }

  function restore() {
    var data = safeGet();
    var restored = 0;
    form.querySelectorAll('[data-save]').forEach(function (el) {
      var v = data[el.name];
      if (v === undefined) return;
      if (el.type === 'checkbox') {
        if (Array.isArray(v) && v.indexOf(el.value) !== -1) { el.checked = true; restored++; }
      } else if (el.type === 'radio') {
        if (v === el.value) { el.checked = true; restored++; }
      } else { el.value = v; restored++; }
    });
    return restored;
  }

  var saveTimer;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      var ok = safeSet(collect());
      if (!bar) return;
      bar.setAttribute('data-state', ok ? 'saved' : 'unsaved');
      barText.textContent = ok
        ? 'Saved in this browser. You can close this and come back to it.'
        : 'This browser is not letting us save. Finish in one sitting, or print the page as you go.';
    }, 400);
  }

  /* --- the summary ------------------------------------------------------ */
  function label(el) {
    var fs = el.closest('fieldset');
    if (fs) {
      var lg = fs.querySelector('legend');
      if (lg && !lg.classList.contains('visually-hidden')) return lg.textContent.trim();
      // priority rows: the question is the row's label, not the legend
      var row = el.closest('.prio__row');
      if (row) return row.querySelector('.prio__label').textContent.trim();
      if (lg) return lg.textContent.replace(/^Priority for:\s*/, '').trim();
    }
    var wrap = el.closest('.q');
    var lb = wrap && wrap.querySelector('label.label, span.label');
    return lb ? lb.textContent.trim() : el.name;
  }

  function buildSummary() {
    var lines = [];
    lines.push('MARSHALL LAW PRACTICE — INTAKE ANSWERS');
    lines.push('Keyanna A. Marshall  ·  prepared for Front Porch Collective');
    lines.push('');

    form.querySelectorAll('.qsection').forEach(function (section) {
      var h = section.querySelector('h2');
      if (!h || section.id === 'finish') return;
      var out = [];

      section.querySelectorAll('[data-save]').forEach(function (el) {
        if (el.type === 'checkbox' || el.type === 'radio') return;   // handled below
        if (!el.value.trim()) return;
        out.push('  ' + label(el) + '\n    ' + el.value.trim().replace(/\n/g, '\n    '));
      });

      var seen = {};
      section.querySelectorAll('input[type=radio]:checked, input[type=checkbox]:checked').forEach(function (el) {
        var key = el.name;
        if (el.type === 'checkbox') {
          if (seen[key]) return;
          seen[key] = true;
          var all = [];
          section.querySelectorAll('input[type=checkbox][name="' + key + '"]:checked')
            .forEach(function (c) { all.push(c.value); });
          out.push('  ' + label(el) + '\n    ' + all.join(', '));
        } else {
          out.push('  ' + label(el) + '\n    ' + el.value);
        }
      });

      if (out.length) {
        lines.push(h.textContent.trim().toUpperCase());
        lines.push(out.join('\n'));
        lines.push('');
      }
    });

    if (lines.length <= 3) lines.push('(Nothing filled in yet.)');
    return lines.join('\n');
  }

  var summaryWrap = document.querySelector('[data-summary-wrap]');
  var summary = document.getElementById('summary');
  var copyBtn = document.querySelector('[data-copy]');

  var buildBtn = document.querySelector('[data-build]');
  if (buildBtn) buildBtn.addEventListener('click', function () {
    summary.value = buildSummary();
    summaryWrap.hidden = false;
    if (copyBtn) copyBtn.hidden = false;
    summary.scrollIntoView({ block: 'nearest' });
  });

  if (copyBtn) copyBtn.addEventListener('click', function () {
    var done = function () {
      copyBtn.textContent = 'Copied';
      setTimeout(function () { copyBtn.textContent = 'Copy to clipboard'; }, 2200);
    };
    /* The async clipboard API needs a secure context and can be blocked
       outright; select-and-execCommand still works when it is not available. */
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(summary.value).then(done, function () {
        summary.select(); document.execCommand('copy'); done();
      });
    } else {
      summary.select(); document.execCommand('copy'); done();
    }
  });

  form.addEventListener('input', save);
  form.addEventListener('change', save);

  if (bar) {
    bar.hidden = false;
    var n = restore();
    if (n) {
      bar.setAttribute('data-state', 'saved');
      barText.textContent = 'Picked up where you left off — ' + n + ' answer' + (n === 1 ? '' : 's') + ' restored.';
    }
  }
})();
