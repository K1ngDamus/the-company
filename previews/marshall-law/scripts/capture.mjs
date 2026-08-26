/* Capture the pitch set: phone screens at 2x, desktop screens at 2x, and
   print-to-PDF for the two documents she actually fills in or prints. */
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const T={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.woff2':'font/woff2','.jpg':'image/jpeg','.png':'image/png','.txt':'text/plain','.xml':'application/xml'};
const s=createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);let f=join('dist',p);if(p.endsWith('/'))f=join('dist',p,'index.html');if(!existsSync(f)){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[extname(f)]||'application/octet-stream'});r.end(readFileSync(f))});
await new Promise(r=>s.listen(0,r)); const base=`http://127.0.0.1:${s.address().port}`;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});

const PHONE = [['/', 'phone-1-home'], ['/practice-areas/criminal-defense/','phone-2-criminal'], ['/contact/','phone-3-contact']];
const DESK  = [['/', 'desk-1-home'], ['/about/','desk-2-about'], ['/results/','desk-3-results'],
               ['/exposure/','desk-4-exposure'], ['/contact/','desk-5-contact']];

const cm = await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
for (const [route,name] of PHONE) {
  const pg=await cm.newPage(); await pg.goto(base+route,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
  await pg.waitForTimeout(250);
  await pg.screenshot({path:`outbox/shots/${name}.png`}); await pg.close();
}
await cm.close();

const cd = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});
for (const [route,name] of DESK) {
  const pg=await cd.newPage(); await pg.goto(base+route,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
  await pg.waitForTimeout(250);
  await pg.screenshot({path:`outbox/shots/${name}.png`}); await pg.close();
}
// Full-length exposure page — the pitch argument end to end
const pg=await cd.newPage(); await pg.goto(base+'/exposure/',{waitUntil:'networkidle'});
await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(250);
await pg.screenshot({path:'outbox/shots/desk-6-exposure-full.png', fullPage:true}); await pg.close();

// --- print to PDF: the two documents ---
const cp = await b.newContext({viewport:{width:1100,height:1400}});
for (const [route,file] of [['/start/','Marshall-Law-Getting-Started-FORM.pdf'],
                            ['/review-card/','Marshall-Law-Review-Card.pdf']]) {
  const p2=await cp.newPage();
  await p2.goto(base+route,{waitUntil:'networkidle'});
  await p2.evaluate(()=>document.fonts.ready);
  await p2.emulateMedia({media:'print'});
  await p2.pdf({path:`outbox/${file}`, format:'Letter', printBackground:true,
                margin:{top:'14mm',bottom:'14mm',left:'14mm',right:'14mm'}});
  await p2.close();
}
await b.close(); s.close();
console.log('captured');
