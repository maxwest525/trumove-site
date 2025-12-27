"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HTML = `
  <div class="tru-page-frame">
    <div class="tru-page-inner">

      <!-- HERO -->
      <section class="tru-hero2" id="tm-home">
        <div class="tru-hero2-inner">
          <div class="tru-hero2-grid">

            <!-- LEFT -->
            <div class="tru-hero2-left">
              <div class="tru-hero2-kicker">
                <span class="tru-kdot" aria-hidden="true"></span>
                AI-ASSISTED QUOTING, VERIFIED CARRIER STANDARDS
              </div>

              <h1 class="tru-hero2-h1">
                Accurate long-distance quotes,
                <span class="tru-hero2-accent"> without the games.</span>
              </h1>

              <p class="tru-hero2-sub">
                Get a real price range in minutes using regulated move signals, route intelligence, and a vetted carrier network.
                Built for transparency, not bait-and-switch.
              </p>

              <!-- TRUST, integrated -->
              <div class="tru-hero2-trust" aria-label="Compliance and authority">
                <div class="tru-trust-plaque">
                  <div class="tru-trust-top">Verified</div>
                  <div class="tru-trust-tag">USDOT</div>
                  <div class="tru-trust-text">USDOT Compliant</div>
                </div>
                <div class="tru-trust-plaque">
                  <div class="tru-trust-top">Verified</div>
                  <div class="tru-trust-tag">INSURED</div>
                  <div class="tru-trust-text">Bonded and Insured</div>
                </div>
                <div class="tru-trust-plaque">
                  <div class="tru-trust-top">Verified</div>
                  <div class="tru-trust-tag">FMCSA</div>
                  <div class="tru-trust-text">FMCSA Authorized Carriers</div>
                </div>
                <div class="tru-trust-plaque">
                  <div class="tru-trust-top">Verified</div>
                  <div class="tru-trust-tag">BROKER</div>
                  <div class="tru-trust-text">Licensed Interstate Broker</div>
                </div>
              </div>

              <div class="tru-hero2-metrics" aria-label="Platform highlights">
                <div class="tru-metric"><span class="tru-metric-dot"></span> Instant AI quote range</div>
                <div class="tru-metric"><span class="tru-metric-dot"></span> Video consult option</div>
                <div class="tru-metric"><span class="tru-metric-dot"></span> Claims and review monitoring</div>
              </div>
            </div>

            <!-- RIGHT: FORM -->
            <div class="tru-hero2-right">
              <div class="tru-formcard2">
                <div class="tru-formcard2-head">
                  <div class="tru-formcard2-title">Start your quote</div>
                  <div class="tru-formcard2-sub">
                    Enter the basics, get an accurate range, then confirm inventory when you are ready.
                  </div>
                </div>

                <form class="tru-form2" id="truHeroQuoteForm">
                  <label class="tru-field">
                    <span class="tru-label">Full name</span>
                    <input class="tru-input" type="text" name="name" placeholder="Your name" autocomplete="name" />
                  </label>

                  <div class="tru-row2">
                    <label class="tru-field">
                      <span class="tru-label">ZIP code</span>
                      <input class="tru-input" type="text" name="zip" placeholder="ZIP" inputmode="numeric" />
                    </label>

                    <label class="tru-field">
                      <span class="tru-label">Move size</span>
                      <select class="tru-select" name="size">
                        <option value="">Select size</option>
                        <option>Studio / 1BR</option>
                        <option>2BR</option>
                        <option>3BR</option>
                        <option>4BR+</option>
                      </select>
                    </label>
                  </div>

                  <button class="tru-btn2" type="submit">
                    Get my quote <span aria-hidden="true">→</span>
                  </button>

                  <div class="tru-formcard2-foot">
                    You stay in control, no spam, transparent workflow, verified carriers.
                  </div>
                </form>
              </div>

              <div class="tru-right-note">
                Prefer a human walkthrough, book a video consult and build the inventory together.
              </div>
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
              <div classz e="tru-simple-card-text">Tap through rooms, add items, and watch your move build itself.</div>
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
                <button type="submit" class="tru-contact-btn" id="truContactBtn">Send Message</button>
                <span class="tru-contact-hint">Average reply time under one business day.</span>
              </div>
            </form>
          </div>

          <div class="tru-contact-secondary">
            <span>Prefer to talk to a real person.</span>
            <button class="tru-contact-secondary-btn" type="button">
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
    // Hero form routes to estimate page
    const heroForm = document.getElementById("truHeroQuoteForm");
    const onHeroSubmit = (e) => {
      e.preventDefault();
      router.push("/online-estimate");
    };
    heroForm?.addEventListener("submit", onHeroSubmit);

    // Features button -> vetting
    const featuresBtn = document.querySelector(".tru-simple-cta-btn");
    const onFeaturesClick = () => router.push("/vetting");
    featuresBtn?.addEventListener("click", onFeaturesClick);

    // Contact form -> mailto
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

      window.location.href =
        `mailto:info@trumoveinc.com?subject=TruMove Contact Request&body=${body}`;
    };
    contactForm?.addEventListener("submit", onContactSubmit);

    // Talk button -> book
    const talkBtn = document.querySelector(".tru-contact-secondary-btn");
    const onTalkClick = () => router.push("/book");
    talkBtn?.addEventListener("click", onTalkClick);

    return () => {
      heroForm?.removeEventListener("submit", onHeroSubmit);
      featuresBtn?.removeEventListener("click", onFeaturesClick);
      contactForm?.removeEventListener("submit", onContactSubmit);
      talkBtn?.removeEventListener("click", onTalkClick);
    };
  }, [router]);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
