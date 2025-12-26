"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HTML = `
<section class="tm-hero">
  <div class="tm-hero-inner">
    <div class="tm-hero-grid">

      <!-- LEFT -->
      <div class="tm-hero-copy">
        <div class="tm-hero-kicker">
          AI-assisted quoting, regulated move intelligence
        </div>

        <h1 class="tm-hero-title">
          Get a real moving price
          <br />
          before you commit.
        </h1>

        <p class="tm-hero-sub">
          TruMove generates accurate long-distance price ranges using
          federally regulated move data, route intelligence, and verified
          carrier performance. No bait pricing, no guesswork.
        </p>

        <ul class="tm-hero-points">
          <li>USDOT and FMCSA regulated move signals</li>
          <li>Vetted interstate carrier network</li>
          <li>Optional live video inventory review</li>
          <li>One transparent workflow from quote to move day</li>
        </ul>
      </div>

      <!-- RIGHT -->
      <div class="tm-hero-form">
        <div class="tm-form-card">
          <div class="tm-form-head">
            <div class="tm-form-title">Start your quote</div>
            <div class="tm-form-sub">
              Enter a few details to receive a realistic price range.
            </div>
          </div>

          <form id="heroQuoteForm" class="tm-form">
            <label class="tm-field">
              <span>Full name</span>
              <input type="text" id="name" placeholder="Your name" />
            </label>

            <label class="tm-field">
              <span>ZIP code</span>
              <input type="text" id="zip" placeholder="ZIP code" />
            </label>

            <label class="tm-field">
              <span>Move size</span>
              <select id="size">
                <option value="">Select size</option>
                <option>Studio or 1 bedroom</option>
                <option>2 bedrooms</option>
                <option>3 bedrooms</option>
                <option>4 bedrooms or more</option>
              </select>
            </label>

            <button type="submit" class="tm-form-btn">
              Get my quote
            </button>

            <div class="tm-form-foot">
              No spam calls. No obligation. Review details before confirming.
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</section>
`;

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const form = document.getElementById("heroQuoteForm");

    const onSubmit = (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const zip = document.getElementById("zip")?.value.trim();
      const size = document.getElementById("size")?.value;

      if (!name || !zip || !size) {
        alert("Please complete all fields to continue.");
        return;
      }

      router.push("/online-estimate");
    };

    form?.addEventListener("submit", onSubmit);
    return () => form?.removeEventListener("submit", onSubmit);
  }, [router]);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
