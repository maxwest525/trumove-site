Skip to content
max's projects
max's projects

Pro

trumove-site

8aczJSwCj


Find…
F

Source
Output
app/page.jsx

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
Deployments
