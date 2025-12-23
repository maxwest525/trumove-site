"use client";

import "./globals.css";

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
                <span>Real time updates</span>
              </div>
            </div>

            <div class="tru-hero-actions">
              <button class="tru-hero-btn-primary" id="truHeroStartQuote">
                Start my quote
              </button>

              <button class="tru-hero-btn-secondary" type="button">
                <span>See how TruMove works</span>
                <span class="chevron">→</span>
              </button>
            </div>

            <div class="tru-hero-note">
              No hidden fees, no endless phone calls, just one clean dashboard for your whole move.
            </div>
          </div>

          <div class="tru-hero-visual">
            <div class="tru-hero-visual-tag">
              <span class="tru-hero-visual-tag-dot"></span>
              <span>Preview from your dashboard</span>
            </div>

            <div class="tru-hero-visual-body">
              <div class="tru-hero-mini-header">
                <div class="tru-hero-mini-title">
                  TruMove Smart Quote
                </div>
                <div class="tru-hero-mini-status">
                  <span class="tru-hero-mini-status-dot"></span>
                  <span>Pre approved movers found</span>
                </div>
              </div>

              <div class="tru-hero-mini-row">
                <span class="tru-hero-mini-label">Move size</span>
                <span class="tru-hero-mini-value">2 Bedroom, local</span>
              </div>

              <div class="tru-hero-mini-row">
                <span class="tru-hero-mini-label">Estimated range</span>
                <span class="tru-hero-mini-value">$930 - $1,180</span>
              </div>

              <div class="tru-hero-mini-row">
                <span class="tru-hero-mini-label">Recommended crew</span>
                <span class="tru-hero-mini-value">3 movers, 1 truck</span>
              </div>

              <div class="tru-hero-mini-bar">
                <div class="tru-hero-mini-bar-fill"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- QUICK MINI QUOTE FORM -->
      <section class="tru-mini-wrap" id="truMiniSection">
        <div class="tru-mini-card">
          <div class="tru-mini-title">Start Your Move</div>
          <div class="tru-mini-sub">Enter a few quick details and we will take you to your personalized quote.</div>

          <form class="tru-mini-form" id="truMiniForm" onsubmit="return false;">
            <input type="text" id="miniName" class="tru-mini-input" placeholder="Your name" required>
            <input type="text" id="miniZip" class="tru-mini-input" placeholder="Your ZIP code" required>
            <select id="miniSize" class="tru-mini-select" required>
              <option value="" disabled selected>Move size</option>
              <option value="Studio">Studio</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedroom">2 Bedroom</option>
              <option value="3 Bedroom">3 Bedroom</option>
              <option value="4+ Bedroom">4+ Bedroom</option>
            </select>
          </form>

          <button class="tru-mini-btn" id="truMiniSubmit">Get My Quote →</button>
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
                  <input
                    type="text"
                    id="contactName"
                    class="tru-contact-input"
                    autocomplete="name"
                    required
                  />
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
                  <input
                    type="email"
                    id="contactEmail"
                    class="tru-contact-input"
                    autocomplete="email"
                    required
                  />
                  <label for="contactEmail" class="tru-field-label">Your email</label>
                </div>
                <div class="tru-field-error-text">Please enter a valid email address.</div>
              </div>

              <div class="tru-field textarea-field" data-field="message">
                <div class="tru-field-inner">
                  <span class="tru-field-icon" aria-hidden="true" style="top: 18px; transform: none;">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 5H19V14H9L5 18V5Z"
                            stroke-width="1.6"
                            stroke-linejoin="round" />
                    </svg>
                  </span>
                  <textarea
                    id="contactMessage"
                    class="tru-contact-textarea"
                    required
                  ></textarea>
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

  <script>
    // Hero button scroll to mini form
    (function () {
      var btn = document.getElementById("truHeroStartQuote");
      var miniSection = document.getElementById("truMiniSection");
      if (btn && miniSection) {
        btn.addEventListener("click", function () {
          miniSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    })();

    // Mini form redirect
    (function () {
      var btn = document.getElementById("truMiniSubmit");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var name = document.getElementById("miniName").value.trim();
        var zip = document.getElementById("miniZip").value.trim();
        var size = document.getElementById("miniSize").value;

        if (!name || !zip || !size) {
          alert("Please fill out all fields to proceed.");
          return;
        }

        // Change this to your real quote page URL
       var url = "https://trumoveinc.com/book-video%2Fphone-consult";

      // If inside an iframe (GoDaddy embed), redirect the full page
      try {
        if (window.top && window.top !== window.self) {
          window.top.location.href = url;
        } else {
          window.location.href = url;
        }
      } catch (e) {
        // If GoDaddy blocks top navigation, open as fallback
        window.open(url, "_blank");
      }
    });
  })();

    // Contact form validation and floating labels
    (function () {
      var form = document.getElementById("truContactForm");
      if (!form) return;

      var nameField = form.querySelector('.tru-field[data-field="name"]');
      var emailField = form.querySelector('.tru-field[data-field="email"]');
      var messageField = form.querySelector('.tru-field[data-field="message"]');

      var nameInput = document.getElementById("contactName");
      var emailInput = document.getElementById("contactEmail");
      var messageInput = document.getElementById("contactMessage");

      function validateEmail(value) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(value).toLowerCase());
      }

      function setFieldState(fieldEl, hasError) {
        if (hasError) {
          fieldEl.classList.add("has-error");
        } else {
          fieldEl.classList.remove("has-error");
        }

        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (input && input.value.trim() !== "") {
          fieldEl.classList.add("has-value");
        } else {
          fieldEl.classList.remove("has-value");
        }
      }

      form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (!input) return;

        input.addEventListener("input", function () {
          setFieldState(fieldEl, false);
        });

        input.addEventListener("blur", function () {
          setFieldState(fieldEl, fieldEl.classList.contains("has-error"));
        });

        setFieldState(fieldEl, false);
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var hasError = false;

        if (!nameInput.value.trim()) {
          setFieldState(nameField, true);
          hasError = true;
        } else {
          setFieldState(nameField, false);
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
          setFieldState(emailField, true);
          hasError = true;
        } else {
          setFieldState(emailField, false);
        }

        if (!messageInput.value.trim()) {
          setFieldState(messageField, true);
          hasError = true;
        } else {
          setFieldState(messageField, false);
        }

        if (hasError) return;

        alert("Thank you. Your message has been sent to the TruMove team.");
        form.reset();
        form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
          fieldEl.classList.remove("has-error", "has-value");
        });
      });
    })();
  </script>
</body>
</html>;

export default function HomePage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: HTML }} />
  );
}


