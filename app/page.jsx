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
              <button class="tru-hero-btn-secondary" id="truHowBtn" type="button">
                <span>See how TruMove works</span>
                <span class="chevron">→</span>
              </button>
            </div>

            <div class="tru-hero-note">
              No hidden fees, no endless phone calls, just one clean dashboard for your whole move.
            </div>
          </div>

          <!-- HERO VISUAL -->
          <div class="tru-hero-visual">
            <div class="tru-hero-visual-tag">
              <span class="tru-hero-visual-tag-dot"></span>
              <span>Start Your Move</span>
            </div>

            <!-- INTENT BUTTONS -->
            <div class="tru-intent-row">
              <button id="truIntentSpecialist" class="tru-hero-btn-primary" type="button">
                Talk to a Moving Specialist
              </button>

              <button id="truIntentEstimate" class="tru-hero-btn-primary" type="button">
                Get an Online Estimate
              </button>
            </div>

            <!-- PANEL: SPECIALIST (HIDDEN BY DEFAULT) -->
            <div id="truPanelSpecialist" hidden>
              <div class="tru-hero-form-title">Speak with a specialist now</div>
              <div class="tru-hero-form-sub">
                Quick call or video consult with a licensed moving coordinator.
              </div>

              <form class="tru-hero-form" id="truSpecialistForm" onsubmit="return false;">
                <div class="tru-hero-form-row">
                  <input id="specName" type="text" placeholder="Your name" required />
                  <div class="tru-field-error-text" id="error-specName" style="display:none"></div>
                </div>

                <div class="tru-hero-form-row">
                  <input id="specPhone" type="tel" placeholder="Phone number" required />
                  <div class="tru-field-error-text" id="error-specPhone" style="display:none"></div>
                </div>

                <div class="tru-hero-form-row two">
                  <div style="width:100%;">
                    <input id="specFromZip" type="text" inputmode="numeric" placeholder="Moving from ZIP" required />
                    <div class="tru-field-error-text" id="error-specFromZip" style="display:none"></div>
                  </div>
                  <div style="width:100%;">
                    <input id="specToZip" type="text" inputmode="numeric" placeholder="Moving to ZIP" required />
                    <div class="tru-field-error-text" id="error-specToZip" style="display:none"></div>
                  </div>
                </div>

                <div class="tru-hero-form-row">
                  <select id="specPreferred" required>
                    <option value="" disabled selected>Preferred contact</option>
                    <option value="Phone call">Phone call</option>
                    <option value="Video consult">Video consult</option>
                  </select>
                  <div class="tru-field-error-text" id="error-specPreferred" style="display:none"></div>
                </div>

                <button id="truSpecialistSubmit" class="tru-hero-btn-primary" type="button">
                  Connect Me Now →
                </button>
              </form>
            </div>

            <!-- PANEL: ONLINE ESTIMATE (HIDDEN BY DEFAULT) -->
            <div id="truPanelEstimate" hidden>
              <div class="tru-hero-form-title">Instant move estimate</div>
              <div class="tru-hero-form-sub">
                Enter a few details to see your pricing range.
              </div>

              <form class="tru-hero-form" id="truHeroForm" onsubmit="return false;">
                <div class="tru-hero-form-row two">
                  <div style="width:100%;">
                    <input id="miniFromZip" type="text" inputmode="numeric" placeholder="Moving from ZIP" required />
                    <div class="tru-field-error-text" id="error-miniFromZip" style="display:none"></div>
                  </div>
                  <div style="width:100%;">
                    <input id="miniToZip" type="text" inputmode="numeric" placeholder="Moving to ZIP" required />
                    <div class="tru-field-error-text" id="error-miniToZip" style="display:none"></div>
                  </div>
                </div>

                <div class="tru-hero-form-row">
                  <select id="miniSize" required>
                    <option value="" disabled selected>Move size</option>
                    <option value="Studio">Studio</option>
                    <option value="1 Bedroom">1 Bedroom</option>
                    <option value="2 Bedroom">2 Bedroom</option>
                    <option value="3 Bedroom">3 Bedroom</option>
                    <option value="4+ Bedroom">4+ Bedroom</option>
                  </select>
                  <div class="tru-field-error-text" id="error-miniSize" style="display:none"></div>
                </div>

                <button id="truMiniSubmit" class="tru-hero-btn-primary" type="button">
                  Get My Estimate →
                </button>
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
            <button class="tru-simple-cta-btn" id="truFeaturesBtn" type="button">
              <span>See all features</span>
              <span class="chevron">→</span>
            </button>
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
                  <input type="text" id="contactName" class="tru-contact-input" autocomplete="name" required />
                  <label for="contactName" class="tru-field-label">Your name</label>
                </div>
                <div class="tru-field-error-text">Please enter your name.</div>
              </div>

              <div class="tru-field" data-field="email">
                <div class="tru-field-inner">
                  <input type="email" id="contactEmail" class="tru-contact-input" autocomplete="email" required />
                  <label for="contactEmail" class="tru-field-label">Your email</label>
                </div>
                <div class="tru-field-error-text">Please enter a valid email address.</div>
              </div>

              <div class="tru-field textarea-field" data-field="message">
                <div class="tru-field-inner">
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
            <button class="tru-contact-secondary-btn" id="truTalkBtn" type="button">
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
    // Buttons
    const featuresBtn = document.getElementById("truFeaturesBtn");
    const howBtn = document.getElementById("truHowBtn");
    const talkBtn = document.getElementById("truTalkBtn");

    // Contact form
    const contactForm = document.getElementById("truContactForm");

    // Intent + panels
    const btnSpecialist = document.getElementById("truIntentSpecialist");
    const btnEstimate = document.getElementById("truIntentEstimate");
    const panelSpecialist = document.getElementById("truPanelSpecialist");
    const panelEstimate = document.getElementById("truPanelEstimate");

    // Specialist fields
    const specNameEl = document.getElementById("specName");
    const specPhoneEl = document.getElementById("specPhone");
    const specFromZipEl = document.getElementById("specFromZip");
    const specToZipEl = document.getElementById("specToZip");
    const specPreferredEl = document.getElementById("specPreferred");
    const specialistSubmit = document.getElementById("truSpecialistSubmit");

    // Estimate fields
    const fromZipEl = document.getElementById("miniFromZip");
    const toZipEl = document.getElementById("miniToZip");
    const sizeEl = document.getElementById("miniSize");
    const estimateSubmit = document.getElementById("truMiniSubmit");

    const onFeaturesClick = () => router.push("/vetting");
    const onHowClick = () => router.push("/about");
    const onTalkClick = () => router.push("/book");

    // Contact submit -> mailto
    const onContactSubmit = (e) => {
      e.preventDefault();

      const name = (document.getElementById("contactName")?.value || "").trim();
      const email = (document.getElementById("contactEmail")?.value || "").trim();
      const message = (document.getElementById("contactMessage")?.value || "").trim();

      const body =
        `Name: ${encodeURIComponent(name)}%0D%0A` +
        `Email: ${encodeURIComponent(email)}%0D%0A%0D%0A` +
        `Message:%0D%0A${encodeURIComponent(message)}`;

      window.location.href = `mailto:info@trumoveinc.com?subject=TruMove Contact Request&body=${body}`;
    };

    function saveLead(payload) {
      try {
        localStorage.setItem("tm_lead", JSON.stringify(payload));
      } catch {
        // ignore
      }
    }

    function showPanel(which) {
      if (!panelSpecialist || !panelEstimate) return;

      if (which === "specialist") {
        panelSpecialist.hidden = false;
        panelEstimate.hidden = true;
        setTimeout(() => specNameEl?.focus(), 0);
        return;
      }

      if (which === "estimate") {
        panelSpecialist.hidden = true;
        panelEstimate.hidden = false;
        setTimeout(() => fromZipEl?.focus(), 0);
        return;
      }

      panelSpecialist.hidden = true;
      panelEstimate.hidden = true;
    }

    const onSpecialistIntent = () => showPanel("specialist");
    const onEstimateIntent = () => showPanel("estimate");

    // --- New: inline error helpers for hero forms ---
    function clearAllHeroErrors() {
      const errs = document.querySelectorAll('[id^="error-"]');
      errs.forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
      });
    }

    function showFieldError(fieldId, msg) {
      const el = document.getElementById("error-" + fieldId);
      if (el) {
        el.textContent = msg;
        el.style.display = "block";
      }
    }

    const onSpecialistSubmit = () => {
      clearAllHeroErrors();

      const name = (specNameEl?.value || "").trim();
      const phone = (specPhoneEl?.value || "").trim();
      const fromZip = (specFromZipEl?.value || "").trim();
      const toZip = (specToZipEl?.value || "").trim();
      const preferred = (specPreferredEl?.value || "").trim();

      let firstInvalid = null;

      if (!name) { showFieldError("specName", "Please enter your name."); firstInvalid = firstInvalid || specNameEl; }
      if (!phone) { showFieldError("specPhone", "Please enter your phone number."); firstInvalid = firstInvalid || specPhoneEl; }
      if (!fromZip) { showFieldError("specFromZip", "Please enter the ZIP you are moving from."); firstInvalid = firstInvalid || specFromZipEl; }
      if (!toZip) { showFieldError("specToZip", "Please enter the ZIP you are moving to."); firstInvalid = firstInvalid || specToZipEl; }
      if (!preferred) { showFieldError("specPreferred", "Please select a preferred contact method."); firstInvalid = firstInvalid || specPreferredEl; }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      saveLead({
        intent: "specialist",
        name,
        phone,
        fromZip,
        toZip,
        preferred,
        ts: Date.now(),
      });

      router.push("/book");
    };

    const onEstimateSubmit = () => {
      clearAllHeroErrors();

      const fromZip = (fromZipEl?.value || "").trim();
      const toZip = (toZipEl?.value || "").trim();
      const size = (sizeEl?.value || "").trim();

      let firstInvalid = null;

      if (!fromZip) { showFieldError("miniFromZip", "Please enter the ZIP you are moving from."); firstInvalid = firstInvalid || fromZipEl; }
      if (!toZip) { showFieldError("miniToZip", "Please enter the ZIP you are moving to."); firstInvalid = firstInvalid || toZipEl; }
      if (!size) { showFieldError("miniSize", "Please select a move size."); firstInvalid = firstInvalid || sizeEl; }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      saveLead({
        intent: "estimate",
        fromZip,
        toZip,
        size,
        ts: Date.now(),
      });

      router.push("/online-estimate");
    };

    // Wire events
    featuresBtn?.addEventListener("click", onFeaturesClick);
    howBtn?.addEventListener("click", onHowClick);
    talkBtn?.addEventListener("click", onTalkClick);
    contactForm?.addEventListener("submit", onContactSubmit);

    btnSpecialist?.addEventListener("click", onSpecialistIntent);
    btnEstimate?.addEventListener("click", onEstimateIntent);
    specialistSubmit?.addEventListener("click", onSpecialistSubmit);
    estimateSubmit?.addEventListener("click", onEstimateSubmit);

    // Clear individual field errors when user edits
    const clearErrorListener = (fieldEl, fieldId) => {
      if (!fieldEl) return;
      const handler = () => {
        const e = document.getElementById("error-" + fieldId);
        if (e) { e.textContent = ""; e.style.display = "none"; }
      };
      fieldEl.addEventListener("input", handler);
      return () => fieldEl.removeEventListener("input", handler);
    };

    const removeSpecName = clearErrorListener(specNameEl, "specName");
    const removeSpecPhone = clearErrorListener(specPhoneEl, "specPhone");
    const removeSpecFrom = clearErrorListener(specFromZipEl, "specFromZip");
    const removeSpecTo = clearErrorListener(specToZipEl, "specToZip");
    const removeSpecPref = clearErrorListener(specPreferredEl, "specPreferred");

    const removeMiniFrom = clearErrorListener(fromZipEl, "miniFromZip");
    const removeMiniTo = clearErrorListener(toZipEl, "miniToZip");
    const removeMiniSize = clearErrorListener(sizeEl, "miniSize");

    // Start state: both panels hidden
    showPanel(null);

    return () => {
      featuresBtn?.removeEventListener("click", onFeaturesClick);
      howBtn?.removeEventListener("click", onHowClick);
      talkBtn?.removeEventListener("click", onTalkClick);
      contactForm?.removeEventListener("submit", onContactSubmit);

      btnSpecialist?.removeEventListener("click", onSpecialistIntent);
      btnEstimate?.removeEventListener("click", onEstimateIntent);
      specialistSubmit?.removeEventListener("click", onSpecialistSubmit);
      estimateSubmit?.removeEventListener("click", onEstimateSubmit);

      // remove clear listeners
      removeSpecName && removeSpecName();
      removeSpecPhone && removeSpecPhone();
      removeSpecFrom && removeSpecFrom();
      removeSpecTo && removeSpecTo();
      removeSpecPref && removeSpecPref();

      removeMiniFrom && removeMiniFrom();
      removeMiniTo && removeMiniTo();
      removeMiniSize && removeMiniSize();
    };
  }, [router]);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
