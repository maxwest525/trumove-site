"use client";

import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HTML = `
  <div class="tru-page-frame">
    <div class="tru-page-inner">

      <!-- HERO -->
      <section class="tru-hero">
        <div class="tru-hero-grid">
          <div>
            <div class="tru-hero-pill">
              <span class="tru-hero-pill-dot"></span>
              <span>Smarter moving, powered by TruMove</span>
            </div>

            <h1 class="tru-hero-title">
              Move day control, without the stress.
            </h1>

            <p class="tru-hero-sub">
              TruMove turns a few simple questions into instant pricing, vetted movers, and live support. No spam calls, no surprise add ons, no getting bounced around.
            </p>

            <div class="tru-hero-bullets">
              <div class="tru-hero-badge">
                <span class="tru-hero-badge-dot"></span>
                <span>Instant AI quotes</span>
              </div>
              <div class="tru-hero-badge">
                <span class="tru-hero-badge-dot"></span>
                <span>Vetted mover network</span>
              </div>
              <div class="tru-hero-badge">
                <span class="tru-hero-badge-dot"></span>
                <span>Real-time updates</span>
              </div>
            </div>

            <div class="tru-hero-actions">
              <button class="tru-hero-btn-secondary" type="button">
                <span>See how TruMove works</span>
                <span class="chevron">→</span>
              </button>
            </div>

            <!-- HERO TRUST (CLEAN, NOT BUBBLES) -->
            <div class="tru-hero-trustbar" aria-label="Compliance and authority">
              <div class="tru-hero-trustitem">
                <span class="tru-hero-trustseal" data-code="USDOT" aria-hidden="true"></span>
                <span class="tru-hero-trustlabel">USDOT Compliant</span>
              </div>

              <div class="tru-hero-trustitem">
                <span class="tru-hero-trustseal" data-code="BOND" aria-hidden="true"></span>
                <span class="tru-hero-trustlabel">Bonded and Insured</span>
              </div>

              <div class="tru-hero-trustitem">
                <span class="tru-hero-trustseal" data-code="FMCSA" aria-hidden="true"></span>
                <span class="tru-hero-trustlabel">FMCSA Authorized Carriers</span>
              </div>

              <div class="tru-hero-trustitem">
                <span class="tru-hero-trustseal" data-code="BRKR" aria-hidden="true"></span>
                <span class="tru-hero-trustlabel">Licensed Interstate Broker</span>
              </div>
            </div>

            <div class="tru-hero-note">
              No hidden fees, no endless phone calls, just one clean dashboard for your whole move.
            </div>
          </div>

<!-- HERO VISUAL -->
<div class="tru-hero-visual">

<div class="tru-hero-visual-body tru-hero-formcard" id="truHeroQuoteCard">

  <div class="tru-hero-form-header">
    <div class="tru-hero-form-title">Start Your Move</div>
    <div class="tru-hero-form-sub">
      TruMove gives you full control over your inventory and routing, with expert support whenever you want it.
    </div>
  </div>

    <!-- INTENT BUTTONS -->
    <div class="tru-intent-row">
      <button class="tru-intent-btn tru-intent-primary" id="truIntentSpecialist" type="button">
        Talk to a Specialist Now
      </button>

      <button class="tru-intent-btn tru-intent-secondary" id="truIntentEstimate" type="button">
        Get an Online Estimate
      </button>
    </div>

    <!-- PANEL: SPECIALIST -->
   <div class="tru-intent-panel" id="truPanelSpecialist" style="display:none;">
      <form class="tru-hero-form" id="truSpecialistForm" onsubmit="return false;">
        <div class="tru-hero-form-row">
          <input type="text" id="specName" class="tru-hero-input" placeholder="Your name" required>
        </div>

        <div class="tru-hero-form-row">
          <input type="tel" id="specPhone" class="tru-hero-input" placeholder="Phone number" required>
        </div>

        <div class="tru-hero-form-row two">
          <input type="text" id="specFromZip" class="tru-hero-input" placeholder="Moving from (ZIP)" required>
          <input type="text" id="specToZip" class="tru-hero-input" placeholder="Moving to (ZIP)" required>
        </div>

        <button class="tru-hero-form-btn" id="truSpecialistSubmit" type="button">
          Request a Call
        </button>

        <div class="tru-hero-form-err" id="specErr" aria-live="polite"></div>
      </form>
    </div>

    <!-- Divider stays hidden -->
    <div class="tru-intent-divider" id="truIntentDivider" aria-hidden="true" style="display:none;">
      <span class="tru-intent-divider-line"></span>
      <span class="tru-intent-divider-chip">OR</span>
      <span class="tru-intent-divider-line"></span>
    </div>

    <!-- PANEL: ESTIMATE -->
    <div class="tru-intent-panel" id="truPanelEstimate" style="display:block;">
      <form class="tru-hero-form" id="truHeroForm" onsubmit="return false;">
        <div class="tru-hero-form-row two">
          <input type="text" id="miniFromZip" class="tru-hero-input" placeholder="Moving from (ZIP)" required>

          <select id="miniSize" class="tru-hero-select" required>
            <option value="" disabled selected>Move size</option>
            <option value="Studio">Studio</option>
            <option value="1 Bedroom">1 Bedroom</option>
            <option value="2 Bedroom">2 Bedroom</option>
            <option value="3 Bedroom">3 Bedroom</option>
            <option value="4+ Bedroom">4+ Bedroom</option>
          </select>
        </div>

        <div class="tru-hero-form-row">
          <input type="text" id="miniToZip" class="tru-hero-input" placeholder="Moving to (ZIP)" required>
        </div>

        <button class="tru-hero-form-btn" id="truMiniSubmit" type="button">
          Continue →
        </button>
        <div class="tru-hero-form-err" id="miniErr" aria-live="polite"></div>
      </form>
    </div>

  </div>
</div>


      </section>

      <!-- FEATURES SECTION -->
      <section class="tru-simple-wrap">
        <div class="tru-simple-inner">
          <div class="tru-simple-kicker">All in one platform</div>
          <h2 class="tru-simple-title">The essentials, done right.</h2>
          <p class="tru-simple-sub">
            From instant quotes to live support, TruMove keeps every part of your move in one place so nothing slips through the cracks.
          </p>

          <div class="tru-simple-grid">

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L5 14H11L11 22L19 10H13L13 2Z"
                        stroke-width="1.6"
                        stroke-linejoin="round"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Instant Pricing</div>
              <div class="tru-simple-card-text">Turn a few details into AI powered quotes in seconds.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 6H20M9 12H20M9 18H20" stroke-width="1.6"
                        stroke-linecap="round" />
                  <path d="M4 6L5.5 7.5L8 4.5" stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                  <path d="M4 12L5.5 13.5L8 10.5" stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                  <path d="M4 18L5.5 19.5L8 16.5" stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Inventory Made Easy</div>
              <div class="tru-simple-card-text">Tap through rooms, add items, and watch your move build itself.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="6" width="11" height="12" rx="2"
                        stroke-width="1.6" />
                  <path d="M15 10L20.5 7.5V16.5L15 14"
                        stroke-width="1.6"
                        stroke-linejoin="round"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Live Video Help</div>
              <div class="tru-simple-card-text">Walk your home with a TruMove specialist over secure video.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="8" r="2.2" stroke-width="1.6" />
                  <circle cx="15" cy="8" r="2.2" stroke-width="1.6" />
                  <circle cx="9" cy="16" r="2.2" stroke-width="1.6" />
                  <circle cx="15" cy="16" r="2.2" stroke-width="1.6" />
                  <path d="M11.2 8H12.8M9 10.2V13.8M15 10.2V13.8M11 16H13"
                        stroke-width="1.6"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Smart Matching</div>
              <div class="tru-simple-card-text">We rank movers on real performance, not paid placement.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="13" r="3.2" stroke-width="1.6" />
                  <path d="M11 4V6.5M18 11H15.5M6.5 11H4M15.2 6.8L13.7 8.3M8.3 8.3L6.8 6.8"
                        stroke-width="1.6"
                        stroke-linecap="round" />
                  <path d="M17 17L20 20" stroke-width="1.6"
                        stroke-linecap="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Real Time Updates</div>
              <div class="tru-simple-card-text">Track confirmations, crews, and timing from one live timeline.</div>
            </article>

            <article class="tru-simple-card">
              <div class="tru-simple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L6 5.5V11.5C6 15.1 8.4 18.4 12 19.5C15.6 18.4 18 15.1 18 11.5V5.5L12 3Z"
                        stroke-width="1.6"
                        stroke-linejoin="round" />
                  <path d="M9 11.5L11 13.5L15 9.5"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
              </div>
              <div class="tru-simple-card-title">Built In Protection</div>
              <div class="tru-simple-card-text">We screen carriers and flag red flag reviews before you book.</div>
            </article>
          </div>

          <div class="tru-simple-cta">
            <div class="tru-simple-cta-text">
              <span class="tru-simple-cta-strong">Want the full breakdown.</span>
              Compare TruMove to a traditional moving broker in one quick view.
            </div>
            <button class="tru-simple-cta-btn" type="button">
              <span>See all features</span>
              <span class="chevron">→</span>
            </button>
          </div>
        </div>
      </section>

      <!-- MISSION + STATS + GUARANTEE + TRUST -->
      <section class="tru-mission-wrap">
        <div class="tru-mission-inner">
          <div class="tru-mission-kicker">OUR MISSION</div>
          <h2 class="tru-mission-title">
            Making moving <span>honest</span>, <span>clear</span>, and <span>predictable</span>.
          </h2>
          <p class="tru-mission-text">
            Our mission is to make moving honest, clear, and predictable, using AI and real carrier data to give you transparent prices, trusted movers, and a move that goes the way it should.
          </p>

          <div class="tru-mission-stats-shell">
            <div class="tru-mission-stats-bar">
              <div class="tru-mission-stat">
                <div class="tru-mission-stat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 4L13.9 8.24L18.5 8.74L15 11.79L15.9 16.3L12 14.1L8.1 16.3L9 11.79L5.5 8.74L10.1 8.24L12 4Z"
                          stroke-width="1.5"
                          stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="tru-mission-stat-copy">
                  <div class="tru-mission-stat-number">4.9★</div>
                  <div class="tru-mission-stat-label">Average Rating</div>
                </div>
              </div>

              <div class="tru-mission-stat">
                <div class="tru-mission-stat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 8L12 4L20 8V16L12 20L20 16V8L12 12L4 8Z"
                          stroke-width="1.5"
                          stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="tru-mission-stat-copy">
                  <div class="tru-mission-stat-number">10,000+</div>
                  <div class="tru-mission-stat-label">Moves Assisted</div>
                </div>
              </div>

              <div class="tru-mission-stat">
                <div class="tru-mission-stat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L6 5.5V11.5C6 15.1 8.4 18.4 12 19.5C15.6 18.4 18 15.1 18 11.5V5.5L12 3Z"
                          stroke-width="1.5"
                          stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="tru-mission-stat-copy">
                  <div class="tru-mission-stat-number">0</div>
                  <div class="tru-mission-stat-label">Spam Calls, Ever</div>
                </div>
              </div>
            </div>
          </div>

          <div class="tru-guarantee-wrap">
            <div class="tru-guarantee-card">
              <div>
                <div class="tru-guarantee-tag">
                  <span class="tru-guarantee-tag-dot"></span>
                  <span>TruMove Guarantee</span>
                </div>
                <div class="tru-guarantee-title">If it feels off, we flag it before you ever sign.</div>
                <div class="tru-guarantee-text">
                  Every quote on TruMove passes through our checks so you do not waste time on carriers that are going to play games on price or service.
                </div>
                <ul class="tru-guarantee-list">
                  <li>No spam calls sold to other brokers.</li>
                  <li>No last minute surprise add ons without receipts.</li>
                  <li>Help from a real human if anything feels wrong on move day.</li>
                </ul>
              </div>

              <div class="tru-guarantee-side">
                <span class="tru-guarantee-highlight">We built TruMove from bad experiences.</span>
                <br />
                You should know the real range, the real crew, and the real reputation before you say yes. If we would not book a mover for our own families, they do not show up in your options.
              </div>
            </div>
          </div>

          <div class="tru-trust-wrap">
            <div class="tru-trust-row">
              <span class="tru-trust-label">Trusted across thousands of moves.</span>

              <span class="tru-trust-badge">
                <span class="tru-trust-dot"></span>
                <span>Google Reviews</span>
              </span>

              <span class="tru-trust-badge">
                <span class="tru-trust-dot"></span>
                <span>Yelp Movers</span>
              </span>

              <span class="tru-trust-badge">
                <span class="tru-trust-dot"></span>
                <span>Better Business Bureau</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section class="tru-contact-wrap">
        <div class="tru-contact-inner">
          <h2 class="tru-contact-title">Contact Us</h2>
          <p class="tru-contact-sub">
            Have a question. Send us a message and a TruMove specialist will respond shortly.
          </p>

          <div class="tru-contact-card" id="truContactCard">
            <form class="tru-contact-form" id="truContactForm" novalidate>
              <div class="tru-field" data-field="name">
                <div class="tru-field-inner">
                  <span class="tru-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="9" r="3.2" stroke-width="1.6" />
                      <path d="M6.5 18.4C7.6 16.5 9.7 15.3 12 15.3C14.3 15.3 16.4 16.5 17.5 18.4"
                            stroke-width="1.6"
                            stroke-linecap="round" />
                    </svg>
                  </span>
                  <input type="text" id="contactName" class="tru-contact-input" autocomplete="name" required />
                  <label for="contactName" class="tru-field-label">Your name</label>
                </div>
                <div class="tru-field-error-text">Please enter your name.</div>
              </div>

              <div class="tru-field" data-field="email">
                <div class="tru-field-inner">
                  <span class="tru-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke-width="1.6" />
                      <path d="M4 7L12 12.5L20 7" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                  </span>
                  <input type="email" id="contactEmail" class="tru-contact-input" autocomplete="email" required />
                  <label for="contactEmail" class="tru-field-label">Your email</label>
                </div>
                <div class="tru-field-error-text">Please enter a valid email address.</div>
              </div>

              <div class="tru-field textarea-field" data-field="message">
                <div class="tru-field-inner">
                  <span class="tru-field-icon" aria-hidden="true" style="top: 18px; transform: none;">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 5H19V14H9L5 18V5Z" stroke-width="1.6" stroke-linejoin="round" />
                    </svg>
                  </span>
                  <textarea id="contactMessage" class="tru-contact-textarea" required></textarea>
                  <label for="contactMessage" class="tru-field-label textarea-label">Write your message here</label>
                </div>
                <div class="tru-field-error-text">Please add a short message.</div>
              </div>

              <div class="tru-contact-btn-row">
                <button type="submit" class="tru-contact-btn" id="truContactBtn">
                  Send Message
                </button>
                <span class="tru-contact-hint">Average reply time under one business day.</span>
              </div>
            </form>
          </div>

          <div class="tru-contact-secondary">
            <span>Prefer to talk to a real person.</span>
            <button class="tru-contact-secondary-btn" type="button">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.5 4.5L9.5 4L11 7.5L9.3 8.7C9.9 9.9 10.8 10.9 12 11.7L13.9 10.4L17 12L16.3 15.3C16.2 15.8 15.8 16.1 15.3 16.2C14.1 16.5 12.3 16.1 10.3 14.8C8.3 13.4 6.9 11.7 6.1 10.1C5.5 8.9 5.3 7.8 5.5 6.9C5.6 6.4 5.9 5.9 6.5 4.5Z"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>
              <span>Talk to a TruMove specialist</span>
              <span class="chevron">→</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  </div>
`;

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
  // See all features -> carrier vetting
  const featuresBtn = document.querySelector(".tru-simple-cta-btn");
  const onFeaturesClick = () => router.push("/vetting");
  featuresBtn?.addEventListener("click", onFeaturesClick);

  // Contact form -> email for now
  const contactForm = document.getElementById("truContactForm");
  const onContactSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName")?.value || "";
    const email = document.getElementById("contactEmail")?.value || "";
    const message = document.getElementById("contactMessage")?.value || "";

    const body =
      `Name: ${name}%0D%0A` +
      `Email: ${email}%0D%0A%0D%0A` +
      `Message:%0D%0A${message}`;

    window.location.href = `mailto:info@trumoveinc.com?subject=TruMove Contact Request&body=${body}`;
  };
  contactForm?.addEventListener("submit", onContactSubmit);

  // HERO INTENT + PANELS
  const btnSpecialist = document.getElementById("truIntentSpecialist");
  const btnEstimate = document.getElementById("truIntentEstimate");

  const panelSpecialist = document.getElementById("truPanelSpecialist");
  const panelEstimate = document.getElementById("truPanelEstimate");

  const divider = document.getElementById("truIntentDivider");

  // Specialist fields
  const specNameEl = document.getElementById("specName");
  const specPhoneEl = document.getElementById("specPhone");
  const specFromZipEl = document.getElementById("specFromZip");
  const specToZipEl = document.getElementById("specToZip");
  const specialistSubmit = document.getElementById("truSpecialistSubmit");
  const specErrEl = document.getElementById("specErr");

  // Estimate fields
  const fromZipEl = document.getElementById("miniFromZip");
  const toZipEl = document.getElementById("miniToZip");
  const sizeEl = document.getElementById("miniSize");
  const estimateSubmit = document.getElementById("truMiniSubmit");
  const miniErrEl = document.getElementById("miniErr");

  // Single source of truth for toggle state
  function setIntent(which, opts = { scroll: true }) {
    if (!panelSpecialist || !panelEstimate || !btnSpecialist || !btnEstimate) return;

    const showSpecialist = which === "specialist";
    const showEstimate = which === "estimate";

    panelSpecialist.style.display = showSpecialist ? "block" : "none";
    panelEstimate.style.display = showEstimate ? "block" : "none";

    if (divider) divider.style.display = "none";

    btnSpecialist.classList.toggle("is-active", showSpecialist);
    btnEstimate.classList.toggle("is-active", showEstimate);

    if (!opts || opts.scroll === false) return;

if (opts && opts.focus === true) {
  if (showSpecialist) setTimeout(() => specNameEl?.focus({ preventScroll: true }), 0);
  if (showEstimate) setTimeout(() => fromZipEl?.focus({ preventScroll: true }), 0);
}
  }

const onSpecialistIntent = () => setIntent("specialist", { focus: true });
const onEstimateIntent = () => setIntent("estimate", { focus: true });

  function saveLead(payload) {
    try {
      localStorage.setItem("tm_lead", JSON.stringify(payload));
    } catch (e) {}
  }

  const onSpecialistSubmit = () => {
    const name = (specNameEl?.value || "").trim();
    const phone = (specPhoneEl?.value || "").trim();
    const fromZip = (specFromZipEl?.value || "").trim();
    const toZip = (specToZipEl?.value || "").trim();

    [specNameEl, specPhoneEl, specFromZipEl, specToZipEl].forEach((el) => el?.classList.remove("is-error"));
    if (specErrEl) specErrEl.textContent = "";

    let bad = false;
    if (!name) { specNameEl?.classList.add("is-error"); bad = true; }
    if (!phone) { specPhoneEl?.classList.add("is-error"); bad = true; }
    if (!/^\d{5}$/.test(fromZip)) { specFromZipEl?.classList.add("is-error"); bad = true; }
    if (!/^\d{5}$/.test(toZip)) { specToZipEl?.classList.add("is-error"); bad = true; }

    if (bad) {
      if (specErrEl) specErrEl.textContent = "Please complete all fields, ZIP codes must be 5 digits.";
      return;
    }

    saveLead({ intent: "specialist", name, phone, fromZip, toZip, ts: Date.now() });
    router.push("/book");
  };

  const onEstimateSubmit = () => {
    const fromZip = (fromZipEl?.value || "").trim();
    const toZip = (toZipEl?.value || "").trim();
    const size = (sizeEl?.value || "").trim();

    const zipOk = (z) => /^\d{5}$/.test(z);

    [fromZipEl, toZipEl, sizeEl].forEach((el) => el?.classList.remove("is-error"));
    if (miniErrEl) miniErrEl.textContent = "";

    let bad = false;
    if (!zipOk(fromZip)) { fromZipEl?.classList.add("is-error"); bad = true; }
    if (!zipOk(toZip)) { toZipEl?.classList.add("is-error"); bad = true; }
    if (!size) { sizeEl?.classList.add("is-error"); bad = true; }

    if (bad) {
      if (miniErrEl) miniErrEl.textContent = "Enter valid 5 digit ZIP codes and pick a move size.";
      return;
    }

    saveLead({ intent: "estimate", fromZip, toZip, size, ts: Date.now() });
    router.push(`/online-estimate?from=${encodeURIComponent(fromZip)}&to=${encodeURIComponent(toZip)}&size=${encodeURIComponent(size)}`);
  };

  // HERO: other buttons
  const howBtn = document.querySelector(".tru-hero-btn-secondary");
  const onHowClick = () => router.push("/about");
  howBtn?.addEventListener("click", onHowClick);

  const talkBtn = document.querySelector(".tru-contact-secondary-btn");
  const onTalkClick = () => router.push("/book");
  talkBtn?.addEventListener("click", onTalkClick);

  // Wire hero only if the hero actually exists
  const heroReady = !!(btnSpecialist && btnEstimate && panelSpecialist && panelEstimate && specialistSubmit && estimateSubmit);

  if (heroReady) {
    btnSpecialist.addEventListener("click", onSpecialistIntent);
    btnEstimate.addEventListener("click", onEstimateIntent);
    specialistSubmit.addEventListener("click", onSpecialistSubmit);
    estimateSubmit.addEventListener("click", onEstimateSubmit);

    // INIT: no scroll on load
    setIntent("estimate", { focus: false });
  }

  return () => {
    if (heroReady) {
      btnSpecialist.removeEventListener("click", onSpecialistIntent);
      btnEstimate.removeEventListener("click", onEstimateIntent);
      specialistSubmit.removeEventListener("click", onSpecialistSubmit);
      estimateSubmit.removeEventListener("click", onEstimateSubmit);
    }

    howBtn?.removeEventListener("click", onHowClick);
    talkBtn?.removeEventListener("click", onTalkClick);

    featuresBtn?.removeEventListener("click", onFeaturesClick);
    contactForm?.removeEventListener("submit", onContactSubmit);
  };
}, [router]);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
