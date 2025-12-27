"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const TRUST = [
  { tag: "USDOT", text: "USDOT Compliant" },
  { tag: "INSURED", text: "Bonded and Insured" },
  { tag: "FMCSA", text: "FMCSA Authorized Motor Carriers" },
  { tag: "BROKER", text: "Licensed Interstate Moving Broker" },
];

export default function HomePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [size, setSize] = useState("");

  const [busy, setBusy] = useState(false);
  const [ctaText, setCtaText] = useState("Start");
  const [activeStep, setActiveStep] = useState(0);

  const canSubmit = useMemo(() => {
    return name.trim() && zip.trim() && size.trim();
  }, [name, zip, size]);

  useEffect(() => {
    if (!busy) {
      setCtaText("Start");
      setActiveStep(0);
    }
  }, [busy]);

  const onMiniClick = () => {
    if (!canSubmit) {
      alert("Please fill out all fields to proceed.");
      return;
    }

    setBusy(true);
    setActiveStep(0);
    setCtaText("Building…");

    setTimeout(() => {
      setActiveStep(1);
      setCtaText("Routing…");
    }, 260);

    setTimeout(() => {
      setActiveStep(2);
      setCtaText("Pricing…");
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
                TruMove turns a few simple inputs into a real estimate, vetted carrier options, and hands-on support.
              </p>

              {/* TRUST STRIP (INTEGRATED, LIGHT) */}
              <div className="tru-hero-trust">
                <div className="tm-trust tm-trust--hero" aria-label="Compliance and authority">
                  <div className="tm-trust-inner">
                    <div className="tm-trust-items">
                      {TRUST.map((t, idx) => (
                        <span key={t.tag} className="tm-trust-item">
                          <span className="tm-trust-badge" aria-hidden="true">
                            <span className="tm-trust-badge-top">Verified</span>
                            <span className="tm-trust-badge-tag">{t.tag}</span>
                          </span>
                          <span className="tm-trust-text">{t.text}</span>
                          {idx < TRUST.length - 1 ? (
                            <span className="tm-trust-divider" aria-hidden="true" />
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* HIGHLIGHTS */}
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

              {/* ACTIONS */}
              <div className="tru-hero-actions">
                <button
                  className="tru-hero-btn-primary"
                  type="button"
                  onClick={() => router.push("/online-estimate")}
                >
                  Build inventory + get quote
                </button>

                <button
                  className="tru-hero-btn-secondary"
                  type="button"
                  onClick={() => router.push("/book")}
                >
                  <span>See how TruMove works</span>
                  <span className="chevron">→</span>
                </button>
              </div>

              <div className="tru-hero-note">
                One clean dashboard for your inventory, routing, and quote.
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
                <div className="tru-hero-form-sub">
                  Enter a few details, then build inventory and route for a tighter estimate.
                </div>

                <div className="tru-hero-form">
                  <div className="tru-hero-form-row">
                    <input
                      type="text"
                      className="tru-hero-input"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="tru-hero-form-row two">
                    <input
                      type="text"
                      className="tru-hero-input"
                      placeholder="ZIP code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />

                    <select
                      className="tru-hero-select"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
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

                  <button
                    className="tru-hero-form-btn is-step"
                    type="button"
                    onClick={onMiniClick}
                    disabled={busy}
                    aria-label="Start inventory, then route, then pricing"
                  >
                    <span className="step-track">
                      <span className={`step ${activeStep === 0 ? "active" : ""}`}>Inventory</span>
                      <span className={`step ${activeStep === 1 ? "active" : ""}`}>Route</span>
                      <span className={`step ${activeStep === 2 ? "active" : ""}`}>Pricing</span>
                    </span>
                    <span className="step-cta">{ctaText}</span>
                  </button>
                </div>
              </div>
            </div>
            {/* /RIGHT */}
          </div>
        </section>
      </div>
    </div>
  );
}
