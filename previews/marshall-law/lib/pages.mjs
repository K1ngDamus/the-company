/**
 * Every page of the Marshall Law preview.
 *
 * COPY RULES, held throughout:
 *   • No outcome promises, no "we win," no case results. GA Rules of
 *     Professional Conduct 7.1 governs lawyer advertising; a claim that
 *     creates an unjustified expectation is a bar problem, not a style note.
 *   • No credential, admission year, school, or testimonial appears anywhere.
 *     None of it is verified, so all of it is a labeled blank.
 *   • What IS said: her name, her firm, her tagline, her contact details, her
 *     hours, her one Google review stated with its count, and her press
 *     feature named. Everything else is process — what happens next, what to
 *     do tonight — which is true of defense practice generally and promises
 *     nothing about her outcomes.
 */
import { CLIENT, FLAGS, OPEN, MARKET, isAsk, HEADSHOT_SRC, IMAGES } from '../data/client.mjs';
import { esc, attr, ICONS, blank, consultLabel, ratingBlock, page, paymentsBlock } from './render.mjs';

/* ==========================================================================
   THE CONSULT FORM — embedded, never a button to a second page (brief §2).
   Bucketed radios first, two typed fields last. Under 30 seconds on a phone.
   `id` is parameterised because this form appears twice in one site and
   duplicate ids would silently break every label.
   ========================================================================== */
export const consultForm = (idPrefix, { heading, blurb } = {}) => {
  const i = (name) => `${idPrefix}-${name}`;
  return `<div class="formpanel" id="consult">
    ${heading ? `<div class="formpanel__head">
      <h2>${esc(heading)}</h2>
      ${blurb ? `<p class="small">${esc(blurb)}</p>` : ''}
    </div>` : ''}
    <form class="form" name="${attr(idPrefix)}-consult" method="post" action="#" novalidate>
      <fieldset class="field" style="border:0;padding:0;margin:0">
        <legend class="label">What kind of case is it?</legend>
        <div class="choices">
          <label class="choice"><input type="radio" name="${attr(i('case'))}" value="criminal"><span>Criminal</span></label>
          <label class="choice"><input type="radio" name="${attr(i('case'))}" value="juvenile"><span>Juvenile</span></label>
          <label class="choice"><input type="radio" name="${attr(i('case'))}" value="other"><span>Something else</span></label>
        </div>
        <p class="hint">Not sure? Pick "Something else" — we will work it out on the call.</p>
      </fieldset>

      <fieldset class="field" style="border:0;padding:0;margin:0">
        <legend class="label">How soon do you need help?</legend>
        <div class="choices">
          <label class="choice"><input type="radio" name="${attr(i('when'))}" value="today"><span>Today</span></label>
          <label class="choice"><input type="radio" name="${attr(i('when'))}" value="week"><span>This week</span></label>
          <label class="choice"><input type="radio" name="${attr(i('when'))}" value="planning"><span>Planning ahead</span></label>
        </div>
      </fieldset>

      <div class="field-row">
        <div class="field">
          <label class="label" for="${attr(i('name'))}">Your name</label>
          <input class="input" id="${attr(i('name'))}" name="name" type="text" autocomplete="name" placeholder="First and last">
        </div>
        <div class="field">
          <label class="label" for="${attr(i('phone'))}">Phone</label>
          <input class="input" id="${attr(i('phone'))}" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="(762) 555-0123">
        </div>
      </div>

      <!-- Honeypot: hidden from people, offered to bots. -->
      <input type="text" name="company" tabindex="-1" aria-hidden="true" autocomplete="off"
             style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">

      <button class="btn btn--block btn--lg" type="submit">${esc(consultLabel())}</button>

      <p class="staged">${ICONS.shield(18)}<span><strong>Preview build — this form does not send.</strong>
        On signature it posts to a real handler and the lead lands in the intake
        pipeline. Nothing typed here goes anywhere today.</span></p>

      <p class="hint">Sending a message does not create an attorney–client relationship.
        Please do not include confidential details in this form.</p>
    </form>
  </div>`;
};

/* --- shared section fragments -------------------------------------------- */

const contactChannels = () => `<div class="channels">
    <a class="channel" href="${attr(CLIENT.phoneHref)}">
      <span class="channel__icon">${ICONS.phone()}</span>
      <span>
        <span class="channel__label">Call</span>
        <span class="channel__value">${esc(CLIENT.phone)}</span>
        <span class="channel__note">One tap from any page on your phone.</span>
      </span>
    </a>
    <a class="channel" href="${attr(CLIENT.emailHref)}">
      <span class="channel__icon">${ICONS.mail()}</span>
      <span>
        <span class="channel__label">Email</span>
        <span class="channel__value">${esc(CLIENT.email)}</span>
      </span>
    </a>
    <a class="channel" href="${attr(CLIENT.mapUrl)}" rel="noopener">
      <span class="channel__icon">${ICONS.pin()}</span>
      <span>
        <span class="channel__label">Office</span>
        <span class="channel__value">${esc(CLIENT.nap.street)} ${esc(CLIENT.nap.suite)}<br>${esc(CLIENT.nap.city)}, ${esc(CLIENT.nap.state)} ${esc(CLIENT.nap.zip)}</span>
        <span class="channel__note">Opens in Maps · ${esc(CLIENT.nap.county)}</span>
      </span>
    </a>
    <div class="channel">
      <span class="channel__icon">${ICONS.clock()}</span>
      <span>
        <span class="channel__label">Hours</span>
        <span class="channel__value">${esc(CLIENT.hours.display)}</span>
        <span class="channel__note">Monday to Friday</span>
      </span>
    </div>
    <a class="channel" href="${attr(CLIENT.websiteUrl)}" rel="noopener">
      <span class="channel__icon">${ICONS.globe()}</span>
      <span>
        <span class="channel__label">Web</span>
        <span class="channel__value">${esc(CLIENT.website)}</span>
        <span class="channel__note">The canonical address for the firm.</span>
      </span>
    </a>
    ${paymentsBlock()}
  </div>`;

const faq = (items) => `<div class="faq">
    ${items.map((f) => `<details>
      <summary>${esc(f.q)}</summary>
      <div class="answer">${f.a}</div>
    </details>`).join('\n    ')}
  </div>`;

/* ==========================================================================
   HOME
   ========================================================================== */
const home = () => {
  const body = `
<section class="hero">
  <div class="wrap hero__inner">
    <div>
      ${ratingBlock()}
      <h1 class="hero__name">${esc(CLIENT.attorney)}</h1>
      <p class="hero__role">Criminal Defense — ${esc(CLIENT.cityState)}</p>
      <p class="hero__promise">When everything is on the line, you want someone in your corner who treats your case like it matters. ${esc(CLIENT.tagline)}.</p>
      <div class="btn-row hero__cta">
        <a class="btn btn--lg" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(19)} ${esc(CLIENT.phone)}</a>
        <a class="btn btn--ghost btn--lg" href="#consult">${esc(consultLabel())}</a>
      </div>
      <p class="hero__reassure">
        <span>${esc(CLIENT.hours.display)}, Mon–Fri</span>
        <span>${esc(CLIENT.nap.county)}</span>
        <span>Answers before you decide</span>
      </p>
    </div>
    <div>
      ${FLAGS.hasHeadshot
        ? `<figure class="portrait"><img src="${attr(HEADSHOT_SRC)}" width="800" height="1000" loading="eager" decoding="async" alt="${attr(CLIENT.attorney)}, ${attr(CLIENT.credential)}"><span class="portrait__frame"></span></figure>`
        : `<div class="portrait portrait--empty">
             <p class="portrait__label"><strong>[awaiting client]</strong><br>Headshot — ${
               HEADSHOT_SRC ? 'awaiting permission' : 'we need the image file'
             }. This frame is sized to the real photo, so dropping it in shifts nothing on the page.</p>
             <span class="portrait__frame"></span>
           </div>`}
    </div>
  </div>
</section>

<section class="section section--band">
  <div class="wrap-narrow">
    <div class="urgent stack" style="--flow:1rem">
      <span class="eyebrow">If it just happened</span>
      <h2>The first 48 hours matter more than almost anything that comes after.</h2>
      <p>Arrested over the weekend, or someone you love was? Before the first court date, decisions get made that are hard to undo later.</p>
      <ul>
        <li>You are not required to explain yourself to police without a lawyer present.</li>
        <li>Bond, first appearance, and preliminary hearing move on the court's clock, not yours.</li>
        <li>What gets said on a recorded jail phone line does not stay private.</li>
      </ul>
      <p><strong>Call ${esc(CLIENT.phone)} and get a lawyer's read on where you actually stand.</strong></p>
      <div class="btn-row">
        <a class="btn" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(18)} Call ${esc(CLIENT.phone)}</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section__head">
      <span class="eyebrow">How it works</span>
      <h2>Three steps, starting with a phone call.</h2>
    </div>
    <div class="steps">
      <div class="step">
        <span class="step__n"></span>
        <h3>You call or send the form</h3>
        <p>Tell us what happened in your own words. No forms to print, no portal to sign into, no fee to find out where you stand.</p>
      </div>
      <div class="step">
        <span class="step__n"></span>
        <h3>We talk it through</h3>
        <p>What you are charged with, what the process looks like from here, what the realistic range of outcomes is, and what representation would involve.</p>
      </div>
      <div class="step">
        <span class="step__n"></span>
        <h3>You decide</h3>
        <p>If it is a fit, ${esc(CLIENT.attorneyShort)} takes the case. If it is not, you still leave the call knowing more than you did.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--band">
  <div class="wrap">
    <div class="section__head">
      <span class="eyebrow">Proof</span>
      <h2>What the record actually shows.</h2>
      <p class="small">Everything on this page is verifiable. Nothing here is written by us on ${esc(CLIENT.attorneyFormal)}’s behalf.</p>
    </div>
    <div class="grid grid--3">
      <div class="card">
        <span class="card__icon">${ICONS.scales(26)}</span>
        <h3 class="card__title">${esc(CLIENT.google.rating)} on Google</h3>
        <p class="small" style="margin-top:.5rem">From ${esc(CLIENT.google.countLabel)}. Stated with the count, because one review is one review — and the plan to change that is on the <a href="/exposure/">exposure page</a>.</p>
      </div>
      <div class="card">
        <span class="card__icon">${ICONS.quote(26)}</span>
        <h3 class="card__title">Featured in the press</h3>
        <div class="press__meta" style="margin-top:.5rem">
          <em>"${esc(CLIENT.press.title)}"</em><br>
          ${esc(CLIENT.press.outlet)}, ${esc(CLIENT.press.date)}
        </div>
        <p class="small" style="margin-top:.6rem">${isAsk(CLIENT.press.url) ? 'Link pending — the exact URL was not captured during recon, and we do not link to a guess.' : ''}</p>
      </div>
      <div class="card" style="padding:0;border:0;background:transparent">
        ${blank(OPEN.testimonials, { heading: 'Client testimonials' })}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section__head">
      <span class="eyebrow">Practice areas</span>
      <h2>What ${esc(CLIENT.attorneyShort)} handles.</h2>
    </div>
    <div class="grid grid--3">
      <a class="card" href="/practice-areas/criminal-defense/">
        <span class="card__icon">${ICONS.shield(26)}</span>
        <h3 class="card__title">Criminal Defense</h3>
        <p class="small" style="margin-top:.5rem">Misdemeanours and felonies in ${esc(CLIENT.nap.county)} and the surrounding courts.</p>
        <span class="card__arrow">Read more ${ICONS.arrow(16)}</span>
      </a>
      <div>${blank(OPEN.practiceAreas, { heading: 'Juvenile law' })}</div>
      <div>${blank(OPEN.practiceAreas, { heading: 'Additional practice areas' })}</div>
    </div>
  </div>
</section>

<section class="section section--band">
  <div class="wrap-narrow">
    <div class="section__head">
      <span class="eyebrow">Questions</span>
      <h2>The things people ask before they call.</h2>
    </div>
    ${faq([
      { q: 'What does a consultation cost?', a: FLAGS.consultIsFree
          ? '<p>The first consultation is free.</p>'
          : blank(OPEN.consultCost, { heading: 'Consultation cost' }) },
      { q: 'Do I really need a lawyer for this?', a: '<p>A criminal charge follows you well past the courtroom — background checks, housing, jobs, licences, immigration status. Even a charge that looks minor on paper can carry consequences that are not obvious from the citation.</p><p>The honest answer is that a conversation costs you far less than guessing does. Call and find out where you actually stand.</p>' },
      { q: 'What should I bring, or have ready?', a: '<p>Whatever you already have: the citation, bond paperwork, arrest paperwork, any court date you have been given, and the names of anyone else involved. If you have none of that yet, call anyway — the date is usually the urgent part.</p>' },
      { q: 'What happens at the first court date?', a: '<p>It depends on the charge and the court. Being told what to expect before you walk in is part of what representation is for.</p>' },
      { q: 'Where is the office?', a: `<p>${esc(CLIENT.addressOneLine)} — in ${esc(CLIENT.nap.county)}. <a href="${attr(CLIENT.mapUrl)}" rel="noopener">Open in Maps</a>.</p>` },
    ])}
  </div>
</section>

<section class="section">
  <div class="wrap-narrow">
    ${consultForm('home', {
      heading: 'Tell us what happened.',
      blurb: 'Four taps and two fields. Under thirty seconds on a phone.',
    })}
  </div>
</section>`;

  return page({
    route: '/',
    title: `${CLIENT.attorney} | Criminal Defense Attorney in ${CLIENT.cityState}`,
    description: `${CLIENT.attorney}, ${CLIENT.credential} — criminal defense in ${CLIENT.cityState}. ${CLIENT.tagline}. Call ${CLIENT.phone}.`,
    body,
  });
};

/* ==========================================================================
   ABOUT
   ========================================================================== */
const about = () => {
  const body = `
<section class="section">
  <div class="wrap hero__inner">
    <div class="stack" style="--flow:1.25rem">
      <span class="eyebrow">About</span>
      <h1>${esc(CLIENT.attorney)}</h1>
      <p class="lede">${esc(CLIENT.credential)} · ${esc(CLIENT.firm)} · ${esc(CLIENT.cityState)}</p>
      ${ratingBlock()}
      <div class="btn-row">
        <a class="btn" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(18)} ${esc(CLIENT.phone)}</a>
        <a class="btn btn--ghost" href="/contact/#consult">${esc(consultLabel())}</a>
      </div>
    </div>
    <div>
      ${FLAGS.hasHeadshot
        ? `<figure class="portrait"><img src="${attr(HEADSHOT_SRC)}" width="800" height="1000" loading="eager" decoding="async" alt="${attr(CLIENT.attorney)}, ${attr(CLIENT.credential)}"><span class="portrait__frame"></span></figure>`
        : `<div class="portrait portrait--empty">
             <p class="portrait__label"><strong>[awaiting client]</strong><br>Headshot — ${
               HEADSHOT_SRC ? 'awaiting permission' : 'we need the image file'
             }.</p>
             <span class="portrait__frame"></span>
           </div>`}
    </div>
  </div>
</section>

<section class="section section--band">
  <div class="wrap-narrow stack" style="--flow:1.5rem">
    <h2>${esc(CLIENT.attorneyFormal)}’s story, in her own words</h2>
    <p class="small">This page is built and waiting. Every fact below comes from ${esc(CLIENT.attorneyFormal)} or it does not appear — we do not write a lawyer's biography for them.</p>
    ${blank(OPEN.bio, { heading: 'Biography' })}
    ${blank(OPEN.yearsLicensed, { heading: 'Year admitted to the State Bar of Georgia' })}
    ${blank(OPEN.barAssociations, { heading: 'Bar associations and memberships' })}
  </div>
</section>

<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.25rem">
    <span class="eyebrow">In the press</span>
    <div class="press">
      <span class="press__mark">${ICONS.quote(30)}</span>
      <div>
        <p class="press__title">"${esc(CLIENT.press.title)}"</p>
        <p class="press__meta">${esc(CLIENT.press.outlet)} · ${esc(CLIENT.press.date)}</p>
      </div>
    </div>
    ${isAsk(CLIENT.press.url) ? blank(CLIENT.press.url, { heading: 'Link to the Couriernews feature' }) : ''}
  </div>
</section>

<section class="section section--deep">
  <div class="wrap-narrow">
    ${consultForm('about', { heading: 'Talk to ' + CLIENT.attorneyShort })}
  </div>
</section>`;

  return page({
    route: '/about/',
    title: `About ${CLIENT.attorney} | ${CLIENT.firm}`,
    description: `${CLIENT.attorney}, ${CLIENT.credential} at ${CLIENT.firm} in ${CLIENT.cityState}. ${CLIENT.tagline}.`,
    body,
    breadcrumbs: `<a href="/">Home</a> / <span aria-current="page">About</span>`,
  });
};

/* ==========================================================================
   PRACTICE AREAS — hub
   ========================================================================== */
const practiceHub = () => {
  const body = `
<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.1rem">
    <span class="eyebrow">Practice areas</span>
    <h1>What ${esc(CLIENT.attorneyShort)} handles</h1>
    <p class="lede">Criminal defense is confirmed. The rest of this section is built and waiting on ${esc(CLIENT.attorneyFormal)}’s list — we do not publish a practice area a lawyer has not told us they practise.</p>
  </div>
</section>

<section class="section section--band">
  <div class="wrap">
    <div class="grid grid--3">
      <a class="card" href="/practice-areas/criminal-defense/">
        <span class="card__icon">${ICONS.shield(26)}</span>
        <h3 class="card__title">Criminal Defense</h3>
        <p class="small" style="margin-top:.5rem">Misdemeanours and felonies in ${esc(CLIENT.nap.county)} and the surrounding courts.</p>
        <span class="card__arrow">Read more ${ICONS.arrow(16)}</span>
      </a>
      <div>${blank(OPEN.practiceAreas, { heading: 'Juvenile law' })}</div>
      <div>${blank(OPEN.practiceAreas, { heading: 'Additional area' })}</div>
    </div>
    <p class="small" style="margin-top:2rem">Each confirmed area gets its own page, written to the local search terms people actually type — see <a href="/exposure/">how we get you found</a>.</p>
  </div>
</section>

<section class="section">
  <div class="wrap-narrow">
    ${consultForm('practice', { heading: 'Not sure which one fits?' , blurb: 'Pick "Something else" and we will sort it out on the call.' })}
  </div>
</section>`;

  return page({
    route: '/practice-areas/',
    title: `Practice Areas | ${CLIENT.firm} — ${CLIENT.cityState}`,
    description: `Criminal defense and related practice areas at ${CLIENT.firm} in ${CLIENT.cityState}. Call ${CLIENT.phone}.`,
    body,
    breadcrumbs: `<a href="/">Home</a> / <span aria-current="page">Practice Areas</span>`,
  });
};

/* ==========================================================================
   PRACTICE AREA — criminal defense (the one confirmed area)
   ========================================================================== */
const criminalDefense = () => {
  const body = `
<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.1rem">
    <span class="eyebrow">Practice area</span>
    <h1>Criminal Defense in ${esc(CLIENT.cityState)}</h1>
    <p class="lede">A charge in ${esc(CLIENT.nap.county)} moves on the court's schedule. Getting a lawyer involved early is the part you control.</p>
    <div class="btn-row">
      <a class="btn btn--lg" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(19)} ${esc(CLIENT.phone)}</a>
      <a class="btn btn--ghost btn--lg" href="#consult">${esc(consultLabel())}</a>
    </div>
  </div>
</section>

<section class="section section--band">
  <div class="wrap-narrow stack" style="--flow:1.4rem">
    <h2>What representation actually involves</h2>
    <p>Defense work is mostly the parts nobody sees: reading the file properly, finding what the State can and cannot prove, filing what needs filing before the deadline passes, and telling you the truth about your options rather than the version you want to hear.</p>
    <p>It also means you stop being the one who has to talk to the prosecutor, guess at the process, or work out what a filing deadline means at midnight.</p>
    <h3>What ${esc(CLIENT.attorneyFormal)} needs from you</h3>
    <ul style="color:var(--muted);padding-left:1.15rem">
      <li style="margin-bottom:.5rem">Every piece of paper you have been given — citation, bond, arrest paperwork, court notice.</li>
      <li style="margin-bottom:.5rem">The date, if you have one. It is usually the urgent part.</li>
      <li style="margin-bottom:.5rem">The whole story, including the parts you would rather leave out. ${esc(CLIENT.attorneyFormal)} cannot defend what she does not know.</li>
    </ul>
    ${blank(OPEN.practiceAreas, { heading: `The specific charge types ${CLIENT.attorneyFormal} takes` })}
  </div>
</section>

<section class="section">
  <div class="wrap-narrow">
    <div class="section__head"><span class="eyebrow">Questions</span><h2>About a criminal charge</h2></div>
    ${faq([
      { q: 'I have not been charged yet — is it too early to call?', a: '<p>No. Before charges is often the most useful time to have a lawyer, because it is the point where the most is still moveable.</p>' },
      { q: 'Should I just explain my side to the officer?', a: '<p>You are not required to, and you have the right to have a lawyer present. That right exists precisely because explaining yourself without one so often makes things worse.</p>' },
      { q: 'What does it cost?', a: FLAGS.consultIsFree ? '<p>The first consultation is free. Fees for representation depend on the charge and are discussed on that call.</p>' : blank(OPEN.consultCost, { heading: 'Fees and consultation cost' }) },
      { q: `Which courts does ${CLIENT.attorneyFormal} appear in?`, a: `<p>${esc(CLIENT.nap.county)} and the surrounding area. ${esc(CLIENT.addressOneLine)}.</p>` },
    ])}
  </div>
</section>

<section class="section section--deep">
  <div class="wrap-narrow">
    ${consultForm('criminal', { heading: 'Tell us what happened.', blurb: 'Under thirty seconds. No fee to find out where you stand.' })}
  </div>
</section>`;

  return page({
    route: '/practice-areas/criminal-defense/',
    title: `Criminal Defense Attorney in ${CLIENT.cityState} | ${CLIENT.attorney}`,
    description: `Criminal defense representation in ${CLIENT.cityState} and ${CLIENT.nap.county} from ${CLIENT.attorney}. Call ${CLIENT.phone}.`,
    body,
    breadcrumbs: `<a href="/">Home</a> / <a href="/practice-areas/">Practice Areas</a> / <span aria-current="page">Criminal Defense</span>`,
  });
};

/* ==========================================================================
   RESULTS & REVIEWS
   ========================================================================== */
const results = () => {
  const body = `
<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.1rem">
    <span class="eyebrow">Results &amp; reviews</span>
    <h1>The proof, honestly</h1>
    <p class="lede">This page carries exactly what can be verified today, and marks everything else as pending. That is deliberate.</p>
  </div>
</section>

<section class="section section--band">
  <div class="wrap-narrow stack" style="--flow:1.75rem">
    <div class="card">
      ${ratingBlock()}
      <h2 style="font-size:var(--step-2)">Rated ${esc(CLIENT.google.rating)} on Google</h2>
      <p class="small" style="margin-top:.6rem">From ${esc(CLIENT.google.countLabel)}. Stated with the count attached, every time it appears. A five-star average from one review is a true fact and a thin one, and pretending otherwise is the fastest way to lose a reader who checks.</p>
    </div>

    <div class="card">
      <div class="press">
        <span class="press__mark">${ICONS.quote(30)}</span>
        <div>
          <p class="press__title">"${esc(CLIENT.press.title)}"</p>
          <p class="press__meta">${esc(CLIENT.press.outlet)} · ${esc(CLIENT.press.date)}</p>
        </div>
      </div>
    </div>

    ${blank(OPEN.testimonials, { heading: 'Client testimonials' })}

    <div class="todo">
      <span class="todo__tag">Deliberately absent</span>
      <strong>Case results</strong>
      <p>No case results appear on this site, and none will be added without ${esc(CLIENT.attorneyFormal)}’s instruction and review. Georgia's advertising rules govern how outcomes may be described, and an outcome stated the wrong way creates an expectation she then has to live with. This is a decision, not a gap.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap-narrow">
    <div class="todo">
      <span class="todo__tag">The plan</span>
      <strong>One review today. Her competitors have ${esc(MARKET.reviewGap.competitorRange)}.</strong>
      <p>That gap is the single biggest lever on this whole engagement, and it is not a website problem — it is a process problem with a website component. The full plan is on the <a href="/exposure/">exposure page</a>, and <a href="/review-card/">the review card</a> is already made.</p>
    </div>
  </div>
</section>

<section class="section section--deep">
  <div class="wrap-narrow">
    ${consultForm('results', { heading: 'Talk to ' + CLIENT.attorneyShort })}
  </div>
</section>`;

  return page({
    route: '/results/',
    title: `Results & Reviews | ${CLIENT.firm}`,
    description: `Verified reviews and press for ${CLIENT.firm} in ${CLIENT.cityState}. Rated ${CLIENT.google.rating} on Google from ${CLIENT.google.countLabel}.`,
    body,
    breadcrumbs: `<a href="/">Home</a> / <span aria-current="page">Results &amp; Reviews</span>`,
  });
};

/* ==========================================================================
   CONTACT
   ========================================================================== */
const contact = () => {
  const body = `
<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.1rem">
    <span class="eyebrow">Contact</span>
    <h1>Talk to ${esc(CLIENT.attorneyShort)}</h1>
    <p class="lede">Call, email, or send the form. Every channel below reaches the same office in ${esc(CLIENT.nap.county)}.</p>
    <div class="btn-row">
      <a class="btn btn--lg" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(19)} ${esc(CLIENT.phone)}</a>
      <a class="btn btn--ghost btn--lg" href="${attr(CLIENT.emailHref)}">${ICONS.mail(19)} Email</a>
    </div>
  </div>
</section>

<section class="section section--band">
  <div class="wrap">
    ${contactChannels()}
    ${FLAGS.showPayments ? '' : `<p class="small" style="margin-top:1.25rem">Payment handles from ${esc(CLIENT.attorneyFormal)}’s card (CashApp, Venmo) are built as a component and shipped hidden — awaiting her word on whether they belong on a public website. One flag turns them on.</p>`}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="grid grid--2" style="align-items:start">
      <div>
        ${IMAGES.office.src
          ? `<figure class="officeshot"><img src="${attr(IMAGES.office.src)}" width="1200" height="800" loading="lazy" decoding="async" alt="The ${attr(CLIENT.firm)} office in ${attr(CLIENT.cityState)}"><figcaption class="small">${esc(CLIENT.nap.street)} ${esc(CLIENT.nap.suite)}</figcaption></figure>`
          : `<div class="officeshot officeshot--empty">
               <p class="portrait__label"><strong>[awaiting client]</strong><br>A photo of the office or the building entrance.
               Real photos of a real office beat stock photography every time — people are deciding whether to walk in.</p>
             </div>`}
      </div>
      <div>
        ${consultForm('contact', {
          heading: 'Send a message',
          blurb: 'Four taps and two fields. Under thirty seconds on a phone.',
        })}
      </div>
    </div>
  </div>
</section>`;

  return page({
    route: '/contact/',
    title: `Contact ${CLIENT.firm} | ${CLIENT.cityState}`,
    description: `Contact ${CLIENT.attorney} in ${CLIENT.cityState}. Call ${CLIENT.phone}, email, or send a message. ${CLIENT.hours.display}, Monday to Friday.`,
    body,
    breadcrumbs: `<a href="/">Home</a> / <span aria-current="page">Contact</span>`,
  });
};

/* ==========================================================================
   EXPOSURE — the pitch panel (brief §3). Client-ready, Muscogee-scoped.
   ========================================================================== */
const exposure = () => {
  const step = (title, body) => ({ title, body });
  const steps = [
    step('Google Business Profile', `<p>The profile is what shows up when someone in ${esc(CLIENT.nap.city)} searches on a phone at 11pm. It outranks the website for ${esc(CLIENT.attorneyFormal)}’s own name.</p>
      <ul><li>Claim and verify it${isAsk(OPEN.gbpClaimed) ? ' — <strong>status unconfirmed;</strong> the first job is finding out which of these it is' : ''}.</li>
      <li>Complete every field: services, hours, service area, attributes, description.</li>
      <li>A weekly photo or post, so the profile reads as active rather than abandoned.</li>
      <li>Q&amp;A seeded with the questions people actually ask — the same ones in the site's FAQ.</li></ul>`),
    step('A reviews engine', `<p>${esc(CLIENT.attorneyFormal)} has <strong>${MARKET.reviewGap.hers}</strong>. Her competitors have <strong>${esc(MARKET.reviewGap.competitorRange)}</strong>. Nothing else on this list moves the needle as hard.</p>
      <ul><li>A simple post-case text or email with the direct review link — the fewer taps between "thank you" and the review box, the more reviews exist.</li>
      <li>Target: 25+ reviews in six months.</li>
      <li>The card is already made — see <a href="/review-card/">the review card</a>. It is yours either way.</li>
      <li><strong>${esc(CLIENT.attorneyFormal)}’s call, not ours.</strong> Georgia's advertising rules govern how a lawyer may solicit and use client reviews. The flow gets built to whatever she is comfortable with, and she sees it before it sends anything.</li></ul>`),
    step('Local schema on every page', `<p>She currently has none. This preview already ships it: <code>Attorney</code> JSON-LD with the NAP, hours, area served, and the firm's canonical URL, on every single page.</p>
      <ul><li>Two things are deliberately left out until ${esc(CLIENT.attorneyFormal)} confirms them: <strong>geo coordinates</strong> (a guessed pin drops the map marker on the wrong building) and <strong>aggregate rating</strong> (self-serving review markup is against Google's own guidelines, and one review presented as a rating overstates it).</li>
      <li>Both are one data edit away the moment the answers land.</li></ul>`),
    step('Citations, all NAP-identical', `<p>Every listing has to state the address character-for-character the same way, or they stop reinforcing each other.</p>
      <ul><li><strong>Fix Avvo first</strong> — it lists ZIP 31909; the card says ${esc(CLIENT.nap.zip)}. One of them is wrong, and it must be fixed at the source before anything else is built on top of it.</li>
      <li>Then add: Justia, FindLaw, Yelp, Apple Maps, Bing Places.</li>
      <li>All matching: <code>${esc(CLIENT.addressOneLine)}</code>, <code>${esc(CLIENT.phone)}</code>.</li></ul>`),
    step('Practice-area landing pages', `<p>One page per area, written to the terms people in ${esc(CLIENT.nap.county)} actually type. Verified ${esc(MARKET.verifiedOn)}: she is on page one for <strong>none</strong> of them.</p>
      <div class="tablewrap" style="margin-top:1rem"><table>
        <caption class="visually-hidden">Local search terms and current position</caption>
        <thead><tr><th scope="col">Search term</th><th scope="col">Her position today</th></tr></thead>
        <tbody>${MARKET.moneyTerms.map((t) => `<tr><td>${esc(t.term)}${t.pendingConfirmation ? ' <span class="tag tag--gold">pending confirmation</span>' : ''}</td><td class="cell-bad">${esc(t.herPosition)}</td></tr>`).join('')}</tbody>
      </table></div>
      <p class="small" style="margin-top:.9rem">Currently owned by ${esc(MARKET.competitorsOwningPageOne.join(', '))}.</p>`),
    step('Speed, Core Web Vitals, and local links', `<p>This preview is static HTML with self-hosted fonts and no framework — it loads before a builder-based site has finished deciding what to load.</p>
      <ul><li>Her existing press is a link opportunity that already exists and is not being used.</li>
      <li>Columbus directories and ${esc(CLIENT.nap.county)} business listings.</li>
      <li>Bar associations and legal organisations — ${isAsk(OPEN.barAssociations) ? `pending ${CLIENT.attorneyFormal}’s list of memberships` : ''}.</li></ul>`),
  ];

  const body = `
<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.1rem">
    <span class="eyebrow">How we get you found</span>
    <h1>Being good is not the same as being findable</h1>
    <p class="lede">A plan scoped to ${esc(CLIENT.nap.county)}, built from what is actually true about the firm's position today — verified ${esc(MARKET.verifiedOn)}.</p>
  </div>
</section>

<section class="section section--band">
  <div class="wrap">
    <div class="plan">
      ${steps.map((s) => `<div class="plan__item">
        <span class="plan__n" aria-hidden="true"></span>
        <div class="plan__body"><h3>${s.title}</h3>${s.body}</div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.25rem">
    <h2>Where this starts</h2>
    <p>The review gap and the Avvo ZIP mismatch are the two items that cost nothing to fix and change the most. Everything else compounds on top of them.</p>
    <div class="btn-row">
      <a class="btn" href="/start/">Start the questions</a>
      <a class="btn btn--ghost" href="/review-card/">See the review card</a>
      <a class="btn btn--ghost" href="/">Back to the site</a>
    </div>
  </div>
</section>`;

  return page({
    route: '/exposure/',
    title: `How We Get You Found | A Local Search Plan for ${CLIENT.firm}`,
    description: `A Muscogee County search and exposure plan for ${CLIENT.firm}: Google Business Profile, reviews, local schema, citations and practice-area pages.`,
    body,
    breadcrumbs: `<a href="/">Home</a> / <span aria-current="page">How we get you found</span>`,
  });
};

/* ==========================================================================
   404
   ========================================================================== */
const notFound = () => page({
  route: '/404/',
  title: `Page not found | ${CLIENT.firm}`,
  description: `That page does not exist. Call ${CLIENT.firm} on ${CLIENT.phone} or go back to the home page.`,
  body: `
<section class="section">
  <div class="wrap-narrow stack" style="--flow:1.2rem">
    <span class="eyebrow">404</span>
    <h1>That page is not here</h1>
    <p class="lede">The link may be old, or the address may have a typo in it. If you were trying to reach the office, the fastest route is the phone.</p>
    <div class="btn-row">
      <a class="btn btn--lg" href="${attr(CLIENT.phoneHref)}">${ICONS.phone(19)} ${esc(CLIENT.phone)}</a>
      <a class="btn btn--ghost btn--lg" href="/">Back to the home page</a>
    </div>
  </div>
</section>`,
});

import { startPage, reviewCardPage } from './intake-pages.mjs';

export const PAGES = [
  { route: '/', file: 'index.html', render: home },
  { route: '/about/', file: 'about/index.html', render: about },
  { route: '/practice-areas/', file: 'practice-areas/index.html', render: practiceHub },
  { route: '/practice-areas/criminal-defense/', file: 'practice-areas/criminal-defense/index.html', render: criminalDefense },
  { route: '/results/', file: 'results/index.html', render: results },
  { route: '/contact/', file: 'contact/index.html', render: contact },
  { route: '/exposure/', file: 'exposure/index.html', render: exposure },
  /* From Front Porch rather than part of her site — FPC chrome, noindex like
     everything else here, and linked from the pitch rather than her nav. */
  { route: '/start/', file: 'start/index.html', render: startPage },
  { route: '/review-card/', file: 'review-card/index.html', render: reviewCardPage },
  { route: '/404/', file: '404.html', render: notFound },
];
