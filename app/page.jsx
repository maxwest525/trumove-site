"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const form = document.getElementById("tm-hero-form");
    if (!form) return;

    const onSubmit = (e) => {
      e.preventDefault();
      router.push("/online-estimate");
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [router]);

  return (
    <main>
      {/* HERO */}
      <section className="tm-hero">
        <div className="tm-hero-inner">
          <div className="tm-hero-grid">

            {/* LEFT */}
            <div className="tm-hero-copy">
              <div className="tm-hero-kicker">
                AI-assisted pricing • Regulated carrier data
              </div>

              <h1 className="tm-hero-title">
                Long-distance moving,
                <br />
                priced the right way.
              </h1>

              <p className="tm-hero-sub">
                TruMove generates realistic price ranges using federally regulated
                move data, route intelligence, and verified carrier standards.
                No bait pricing. No pressure.
              </p>

              {/* Integrated trust signals */}
              <div className="tm-hero-trust">
                <span>USDOT compliant</span>
                <span>FMCSA-authorized carriers</span>
                <span>Bonded and insured</span>
                <span>No lead reselling</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="tm-hero-card">
              <div className="tm-hero-card-head">
                Start your quote
              </div>

              <form id="tm-hero-form" className="tm-hero-form">
                <input
                  type="text"
                  placeholder="Full name"
                  required
                />
                <input
                  type="text"
                  placeholder="ZIP code"
                  inputMode="numeric"
                  required
                />
                <select required>
                  <option value="">Move size</option>
                  <option>Studio / 1BR</option>
                  <option>2 Bedroom</option>
                  <option>3 Bedroom</option>
                  <option>4 Bedroom+</option>
                </select>

                <button type="submit">
                  Get my price range →
                </button>

                <div className="tm-hero-card-foot">
                  Transparent pricing. Verified carriers. Human support if needed.
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
