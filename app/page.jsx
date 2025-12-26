"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const onSubmitHero = (e) => {
    e.preventDefault();
    router.push("/online-estimate");
  };

  const onContactSubmit = (e) => {
    e.preventDefault();

    const name = e.currentTarget.contactName?.value || "";
    const email = e.currentTarget.contactEmail?.value || "";
    const message = e.currentTarget.contactMessage?.value || "";

    const body =
      `Name: ${name}\r\n` +
      `Email: ${email}\r\n\r\n` +
      `Message:\r\n${message}`;

    window.location.href =
      `mailto:info@trumoveinc.com?subject=TruMove Contact Request&body=${encodeURIComponent(body)}`;
  };

  return (
    <main>
      <div className="tru-page-frame">
        <div className="tru-page-inner">

          {/* HERO */}
          <section className="tru-hero2" id="tm-home">
            <div className="tru-hero2-inner">
              <div className="tru-hero2-grid">

                {/* LEFT */}
                <div className="tru-hero2-left">
                  <div className="tru-hero2-kicker">
                    <span className="tru-kdot" aria-hidden="true" />
                    VERIFIED COMPLIANCE, HIGH-INTEGRITY PRICING SIGNALS
                  </div>

                  <h1 className="tru-hero2-h1">
                    Long-distance quotes you can trust,
                    <span className="tru-hero2-accent"> built for transparency.</span>
                  </h1>

                  <p className="tru-hero2-sub">
                    TruMove generates a realistic range from regulated move signals, route intelligence,
                    and carrier standards, then keeps everything centralized so you can make a clean decision.
                  </p>

                  {/* TRUST integrated */}
                  <div className="tru-hero2-trust" aria-label="Compliance and authority">
                    <div className="tru-trust-plaque">
                      <div className="tru-trust-top">Verified</div>
                      <div className="tru-trust-tag">USDOT</div>
                      <div className="tru-trust-text">USDOT compliant workflows</div>
                    </div>
                    <div className="tru-trust-plaque">
                      <div className="tru-trust-top">Verified</div>
                      <div className="tru-trust-tag">INSURED</div>
                      <div className="tru-trust-text">Bonded and insured</div>
                    </div>
                    <div className="tru-trust-plaque">
                      <div className="tru-trust-top">Verified</div>
                      <div className="tru-trust-tag">FMCSA</div>
                      <div className="tru-trust-text">Authorized motor carriers</div>
                    </div>
                    <div className="tru-trust-plaque">
                      <div className="tru-trust-top">Verified</div>
                      <div className="tru-trust-tag">BROKER</div>
                      <div className="tru-trust-text">Licensed interstate broker</div>
                    </div>
                  </div>

                  {/* platform highlights */}
                  <div className="tru-hero2-metrics" aria-label="Platform highlights">
                    <div className="tru-metric"><span className="tru-metric-dot" /> Instant quote range</div>
                    <div className="tru-metric"><span className="tru-metric-dot" /> Virtual inventory walkthrough</div>
                    <div className="tru-metric"><span className="tru-metric-dot" /> Live review and claims monitoring</div>
                    <div className="tru-metric"><span className="tru-metric-dot" /> One dashboard, end-to-end</div>
                  </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="tru-hero2-right">
                  <div className="tru-formcard2">
                    <div className="tru-formcard2-head">
                      <div className="tru-formcard2-title">Start your quote</div>
                      <div className="tru-formcard2-sub">
                        Enter the basics now, confirm the inventory when you are ready.
                      </div>
                    </div>

                    <form className="tru-form2" onSubmit={onSubmitHero}>
                      <label className="tru-field">
                        <span className="tru-label">Full name</span>
                        <input className="tru-input" type="text" name="name" placeholder="Your name" autoComplete="name" />
                      </label>

                      <div className="tru-row2">
                        <label className="tru-field">
                          <span className="tru-label">ZIP code</span>
                          <input className="tru-input" type="text" name="zip" placeholder="ZIP" inputMode="numeric" />
                        </label>

                        <label className="tru-field">
                          <span className="tru-label">Move size</span>
                          <select className="tru-select" name="size" defaultValue="">
                            <option value="">Select size</option>
                            <option>Studio / 1BR</option>
                            <option>2BR</option>
                            <option>3BR</option>
                            <option>4BR+</option>
                          </select>
                        </label>
                      </div>

                      <button className="tru-btn2" type="submit">
                        Get my quote <span aria-hidden="true">→</span>
                      </button>

                      <div className="tru-formcard2-foot">
                        Your info stays with TruMove. No lead reselling, no spam routing.
                      </div>
                    </form>
                  </div>

                  <div className="tru-right-note">
                    Want a guided build, book a consult and complete the inventory with a specialist.
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="tru-simple-wrap">
            <div className="tru-simple-inner">
              <div className="tru-simple-kicker">All in one platform</div>
              <h2 className="tru-simple-title">The essentials, engineered clean.</h2>
              <p className="tru-simple-sub">
                Quote, inventory, vetting, and coordination, in one workflow that is designed to prevent surprises.
              </p>

              <div className="tru-simple-grid">
                {/* keep your same cards, unchanged */}
                {/* ... you can paste your existing feature cards here exactly as-is ... */}
              </div>

              <div className="tru-simple-cta">
                <div className="tru-simple-cta-text">
                  <span className="tru-simple-cta-strong">Want the full breakdown.</span>
                  Compare TruMove to traditional broker workflows.
                </div>
                <button
                  className="tru-simple-cta-btn"
                  type="button"
                  onClick={() => router.push("/vetting")}
                >
                  <span>See all features</span>
                  <span className="chevron">→</span>
                </button>
              </div>
            </div>
          </section>

          {/* MISSION */}
          <section className="tru-mission-wrap">
            <div className="tru-mission-inner">
              {/* keep your mission section as-is or adjust copy later */}
              {/* ... */}
            </div>
          </section>

          {/* CONTACT */}
          <section className="tru-contact-wrap">
            <div className="tru-contact-inner">
              <h2 className="tru-contact-title">Contact Us</h2>
              <p className="tru-contact-sub">
                Send a message and a TruMove specialist will respond shortly.
              </p>

              <div className="tru-contact-card" id="truContactCard">
                <form className="tru-contact-form" id="truContactForm" noValidate onSubmit={onContactSubmit}>
                  <div className="tru-field" data-field="name">
                    <div className="tru-field-inner">
                      <span className="tru-field-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="9" r="3.2" strokeWidth="1.6" />
                          <path d="M6.5 18.4C7.6 16.5 9.7 15.3 12 15.3C14.3 15.3 16.4 16.5 17.5 18.4"
                            strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                      <input type="text" id="contactName" name="contactName" className="tru-contact-input" autoComplete="name" required />
                      <label htmlFor="contactName" className="tru-field-label">Your name</label>
                    </div>
                    <div className="tru-field-error-text">Please enter your name.</div>
                  </div>

                  <div className="tru-field" data-field="email">
                    <div className="tru-field-inner">
                      <span className="tru-field-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
                          <path d="M4 7L12 12.5L20 7" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                      <input type="email" id="contactEmail" name="contactEmail" className="tru-contact-input" autoComplete="email" required />
                      <label htmlFor="contactEmail" className="tru-field-label">Your email</label>
                    </div>
                    <div className="tru-field-error-text">Please enter a valid email address.</div>
                  </div>

                  <div className="tru-field textarea-field" data-field="message">
                    <div className="tru-field-inner">
                      <span className="tru-field-icon" aria-hidden="true" style={{ top: 18, transform: "none" }}>
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M5 5H19V14H9L5 18V5Z" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <textarea id="contactMessage" name="contactMessage" className="tru-contact-textarea" required />
                      <label htmlFor="contactMessage" className="tru-field-label textarea-label">Write your message here</label>
                    </div>
                    <div className="tru-field-error-text">Please add a short message.</div>
                  </div>

                  <div className="tru-contact-btn-row">
                    <button type="submit" className="tru-contact-btn" id="truContactBtn">
                      Send Message
                    </button>
                    <span className="tru-contact-hint">Average reply time under one business day.</span>
                  </div>
                </form>
              </div>

              <div className="tru-contact-secondary">
                <span>Prefer to talk to a real person.</span>
                <button className="tru-contact-secondary-btn" type="button" onClick={() => router.push("/book")}>
                  <span>Talk to a TruMove specialist</span>
                  <span className="chevron">→</span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
