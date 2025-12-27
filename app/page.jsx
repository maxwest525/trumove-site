"use client";

import { useRouter } from "next/navigation";

const TRUST = [
  { tag: "USDOT", text: "USDOT Compliant" },
  { tag: "INSURED", text: "Bonded and Insured" },
  { tag: "FMCSA", text: "FMCSA Authorized Motor Carriers" },
  { tag: "BROKER", text: "Licensed Interstate Moving Broker" },
];

export default function HomePage() {
  const router = useRouter();

  const onStart = () => {
    const name = (document.getElementById("miniName")?.value || "").trim();
    const zip = (document.getElementById("miniZip")?.value || "").trim();
    const size = (document.getElementById("miniSize")?.value || "").trim();

    if (!name || !zip || !size) {
      alert("Please fill out all fields to proceed.");
      return;
    }

    const miniBtn = document.getElementById("truMiniSubmit");
    if (miniBtn) {
      miniBtn.setAttribute("data-step", "0");
      miniBtn.classList.add("is-loading");
    }

    setTimeout(() => {
      miniBtn?.setAttribute("data-step", "1");
    }, 260);

    setTimeout(() => {
      miniBtn?.setAttribute("data-step", "2");
    }, 520);

    setTimeout(() => {
      router.push("/online-estimate");
    }, 780);
  };

  return (
    <div className="tru-page-frame">
      <div className="tru-page-inner">
        <section className="tru-hero">
          <div className="tru-hero-grid">
            {/* LEFT */}
            <div>
              <h1 className="tru-hero-title">
                Build your inventory.
                <br />
                Plan your route.
                <br />
                <span>See real pricing.</span>
              </h1>

              <p className="tru-hero-sub">
                TruMove turns a few simple inputs into real pricing guidance, vetted carrier options, and live support through the process.
              </p>

              {/* TRUST STRIP, INTEGRATED */}
              <div className="tru-hero-trust" aria-label="Compliance and authority">
                <div className="tru-hero-trust-row">
                  {TRUST.map((t, idx) => (
                    <div className="tru-hero-trust-item" key={t.tag}>
                      <div className="tru-hero-trust-badge" aria-hidden="true">
                        <div className="tru-hero-trust-top">Verified</div>
                        <div className="tru-hero-trust-tag">{t.tag}</div>
                      </div>
                      <div className="tru-hero-trust-text">{t.text}</div>
                      {idx < TRUST.length - 1 ? <div className="tru-hero-trust-div" aria-hidden="true" /> : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="tru-hero-bullets">
                <div className="tru-hero-badge">
                  <span className="tru-hero-badge-dot" />
                  <span>Instant AI quotes</span>
                </div>
                <div className="tru-hero-badge">
                  <span className="tru-hero-badge-dot" />
                  <span>Vetted mover network</span>
                </div>
                <div className="tru-hero-badge">
                  <span className="tru-hero-badge-dot" />
                  <span>Real time updates</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="tru-hero-visual">
              <div className="tru-hero-visual-tag is-premium">
                <span className="tru-hero-visual-orb" />
                <span className="tru-hero-visual-text">Start Your Move</span>
              </div>

              <div className="tru-hero-visual-body tru-hero-formcard" id="truHeroQuoteCard">
                <div className="tru-hero-form-title">Get your quote in seconds</div>
                <div className="tru-hero-form-sub">Enter a few details, then start your inventory.</div>

                <form className="tru-hero-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="tru-hero-form-row">
                    <input id="miniName" className="tru-hero-input" placeholder="Your name" />
                  </div>

                  <div className="tru-hero-form-row two">
                    <input id="miniZip" className="tru-hero-input" placeholder="ZIP code" />
                    <select id="miniSize" className="tru-hero-select" defaultValue="">
                      <option value="" disabled>
                        Move size
                      </option>
                      <option value="Studio">Studio</option>
                      <option value="1 Bedroom">1 Bedroom</option>
                      <option value="2 Bedroom">2 Bedroom</option>
                      <option value="3 Bedroom">3 Bedroom</option>
                      <option value="4+ Bedroom">4+ Bedroom</option>
                    </select>
                  </div>

                  <button className="tru-hero-form-btn is-step" id="truMiniSubmit" type="button" onClick={onStart}>
                    <span className="step-track">
                      <span className="step s0">Inventory</span>
                      <span className="step s1">Route</span>
                      <span className="step s2">Pricing</span>
                    </span>
                    <span className="step-cta">Start</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .tru-page-frame {
            width: 100%;
          }
          .tru-page-inner {
            max-width: 1480px;
            margin: 0 auto;
            padding: 28px 26px 60px;
          }

          .tru-hero {
            padding-top: 22px;
          }

          .tru-hero-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 28px;
            align-items: start;
          }

          .tru-hero-title {
            font-size: 52px;
            line-height: 1.05;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin: 0 0 18px;
          }
          .tru-hero-title span {
            color: #39ff14;
            font-weight: 900;
          }

          .tru-hero-sub {
            color: rgba(15, 23, 42, 0.72);
            font-size: 16px;
            line-height: 1.55;
            margin: 0 0 14px;
            max-width: 760px;
          }

          .tru-hero-bullets {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 14px;
          }
          .tru-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 999px;
            border: 1px solid rgba(15, 23, 42, 0.1);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.78));
            box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
            font-size: 12px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-weight: 750;
            color: rgba(15, 23, 42, 0.86);
          }
          .tru-hero-badge-dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: #39ff14;
            box-shadow: 0 0 0 5px rgba(57, 255, 20, 0.14);
          }

          .tru-hero-trust {
            margin: 14px 0 6px;
          }
          .tru-hero-trust-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
          }
          .tru-hero-trust-item {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
          }
          .tru-hero-trust-div {
            width: 1px;
            height: 18px;
            background: rgba(15, 23, 42, 0.14);
            opacity: 0.7;
            margin-left: 12px;
          }
          .tru-hero-trust-badge {
            width: 52px;
            height: 32px;
            border-radius: 10px;
            border: 1px solid rgba(15, 23, 42, 0.12);
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, 0.01));
            box-shadow: 0 12px 24px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            line-height: 1;
            flex: 0 0 auto;
          }
          .tru-hero-trust-top {
            font-size: 8px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(15, 23, 42, 0.55);
            font-weight: 800;
          }
          .tru-hero-trust-tag {
            margin-top: 4px;
            font-size: 10px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: rgba(15, 23, 42, 0.92);
            font-weight: 900;
          }
          .tru-hero-trust-text {
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-weight: 800;
            color: rgba(15, 23, 42, 0.86);
          }

          .tru-hero-visual {
            position: relative;
          }

          .tru-hero-formcard {
            border-radius: 18px;
            border: 1px solid rgba(15, 23, 42, 0.1);
            box-shadow: 0 18px 50px rgba(15, 23, 42, 0.1);
            background: #fff;
            padding: 18px;
          }

          .tru-hero-form-title {
            font-size: 18px;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 6px;
          }
          .tru-hero-form-sub {
            color: rgba(15, 23, 42, 0.7);
            font-size: 13px;
            line-height: 1.4;
            margin-bottom: 14px;
          }

          .tru-hero-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .tru-hero-form-row.two {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .tru-hero-input,
          .tru-hero-select {
            width: 100%;
            height: 46px;
            border-radius: 12px;
            border: 1px solid rgba(15, 23, 42, 0.12);
            padding: 0 14px;
            outline: none;
            background: #fff;
          }
          .tru-hero-input:focus,
          .tru-hero-select:focus {
            border-color: rgba(57, 255, 20, 0.55);
            box-shadow: 0 0 0 5px rgba(57, 255, 20, 0.16);
          }

          .tru-hero-form-btn {
            height: 46px;
            border-radius: 999px;
            border: 1px solid rgba(57, 255, 20, 0.45);
            background: linear-gradient(180deg, rgba(57, 255, 20, 0.22), rgba(57, 255, 20, 0.1));
            font-weight: 850;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            padding: 0 18px;
          }
          .tru-hero-form-btn.is-loading {
            opacity: 0.85;
            pointer-events: none;
          }

          .step-track {
            display: flex;
            gap: 10px;
            align-items: center;
          }
          .step {
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            opacity: 0.35;
          }
          .step:not(:last-child)::after {
            content: "→";
            margin-left: 10px;
            opacity: 0.4;
          }

          /* step highlight based on button data-step */
          #truMiniSubmit[data-step="0"] .s0,
          #truMiniSubmit[data-step="1"] .s1,
          #truMiniSubmit[data-step="2"] .s2 {
            opacity: 1;
          }

          .step-cta {
            font-weight: 950;
            letter-spacing: 0.08em;
          }

          .tru-hero-visual-tag.is-premium {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            padding: 12px 14px;
            border-radius: 16px;
            border: 1px solid rgba(15, 23, 42, 0.1);
            background: radial-gradient(circle at 18% 20%, rgba(57, 255, 20, 0.2), rgba(57, 255, 20, 0) 55%),
              linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.72));
            box-shadow: 0 18px 44px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85);
            margin-bottom: 14px;
          }
          .tru-hero-visual-orb {
            width: 12px;
            height: 12px;
            border-radius: 999px;
            background: #39ff14;
            box-shadow: 0 0 0 6px rgba(57, 255, 20, 0.14);
            flex: 0 0 auto;
          }
          .tru-hero-visual-text {
            font-size: 12px;
            font-weight: 950;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: rgba(15, 23, 42, 0.88);
          }

          @media (max-width: 980px) {
            .tru-page-inner {
              padding: 20px 16px 50px;
            }
            .tru-hero-grid {
              grid-template-columns: 1fr;
            }
            .tru-hero-title {
              font-size: 42px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
