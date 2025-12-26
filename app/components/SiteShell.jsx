"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/online-estimate", label: "Get an Estimate" },
  { href: "/vetting", label: "Carrier Standards" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

const STATUS_ITEMS = [
  { key: "ai", label: "Instant AI quotes" },
  { key: "vetted", label: "Vetted mover network" },
  { key: "updates", label: "Real time updates" },
  { key: "video", label: "Virtual video consults" },
  { key: "claims", label: "Live review and claims monitoring" },
  { key: "tracking", label: "Load tracking" },
];

const TRUST_ITEMS = [
  "USDOT compliant",
  "Bonded and insured",
  "FMCSA authorized motor carriers",
  "Licensed interstate moving broker",
];

// simple contextual highlighting by route
function getHighlightKeys(path) {
  if (path === "/online-estimate") return new Set(["ai", "vetted", "updates"]);
  if (path === "/vetting") return new Set(["vetted", "claims"]);
  if (path === "/book") return new Set(["video"]);
  return new Set();
}

function BadgeIcon() {
  // official-looking “seal” icon (no checkmark)
  return (
    <span className="tm-seal" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <path
          d="M12 2.7l2.6 1.3 2.9.4 1.9 2.2 2.1 1.8-.6 2.8.6 2.8-2.1 1.8-1.9 2.2-2.9.4L12 21.3l-2.6-1.3-2.9-.4-1.9-2.2-2.1-1.8.6-2.8-.6-2.8 2.1-1.8 1.9-2.2 2.9-.4L12 2.7z"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <path
          d="M8.2 12.1c1.6-2.4 6-2.4 7.6 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

export default function SiteShell({ children }) {
  const path = usePathname();

  // marquee pause behavior (hover + scroll)
  const [paused, setPaused] = useState(false);
  const scrollT = useRef(null);

  useEffect(() => {
    function onScroll() {
      setPaused(true);
      if (scrollT.current) window.clearTimeout(scrollT.current);
      scrollT.current = window.setTimeout(() => setPaused(false), 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollT.current) window.clearTimeout(scrollT.current);
    };
  }, []);

  const highlight = useMemo(() => getHighlightKeys(path), [path]);

  return (
    <div className="tm-shell">
      {/* TOP CHROME (status above header) */}
      <div className="tm-top">
        {/* STATUS STRIP (marquee) */}
        <div
          className={`tm-statusbar ${paused ? "is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="tm-status-mask tm-status-mask-left" aria-hidden="true" />
          <div className="tm-status-mask tm-status-mask-right" aria-hidden="true" />

          <div className="tm-status-track" role="list" aria-label="Platform capabilities">
            {/* duplicate rows for seamless loop */}
            {[0, 1].map((dup) => (
              <div className="tm-status-row" key={dup} role="presentation">
                {STATUS_ITEMS.map((it) => (
                  <span
                    key={`${dup}-${it.key}`}
                    className={`tm-status-chip ${highlight.has(it.key) ? "is-hot" : ""}`}
                    role="listitem"
                  >
                    {it.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <header className="tm-header">
          <div className="tm-header-inner">
            <Link href="/" className="tm-logo" aria-label="TruMove Home">
              <img className="tm-logo-img" src="/logo.png" alt="TruMove" />
            </Link>

            <nav className="tm-nav" aria-label="Primary">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`tm-nav-link ${path === item.href ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="tm-header-actions">
              <a className="tm-call" href="tel:+10000000000">
                Call Us Now
              </a>
              <Link className="tm-cta" href="/book">
                Book a Consult
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* TRUST STRIP (official, no pills, no extra marketing copy) */}
      <div className="tm-trust" aria-label="Compliance and authority">
        <div className="tm-trust-inner">
          {TRUST_ITEMS.map((t) => (
            <div className="tm-trust-item" key={t}>
              <BadgeIcon />
              <span className="tm-trust-text">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="tm-main">{children}</main>

      <footer className="tm-footer">
        <div className="tm-footer-inner">
          <div className="tm-footer-left">
            <div className="tm-footer-brand">TruMove</div>
            <div className="tm-footer-sub">AI-powered moving quotes and carrier coordination.</div>
          </div>

          <div className="tm-footer-right">
            <Link className="tm-footer-link" href="/vetting">Carrier Standards</Link>
            <Link className="tm-footer-link" href="/book">Book a consult</Link>
            <Link className="tm-footer-link" href="/privacy">Privacy</Link>
            <Link className="tm-footer-link" href="/terms">Terms</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root{
          --tm-green:#39ff14;
          --tm-ink:#0f172a;
          --tm-line:rgba(15,23,42,0.10);
          --tm-soft:rgba(15,23,42,0.04);
          --tm-max:1480px; /* wider to prevent overlap */
        }

        .tm-shell{
          min-height:100vh;
          display:flex;
          flex-direction:column;
          background:#fff;
          color:var(--tm-ink);
          font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
        }

        /* TOP CHROME wraps status + header as one sticky unit */
        .tm-top{
          position:sticky;
          top:0;
          z-index:80;
          background:#fff;
        }

        /* STATUS (marquee) */
        .tm-statusbar{
          position:relative;
          border-bottom:1px solid var(--tm-line);
          background:linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,1));
          overflow:hidden;
        }
        .tm-status-track{
          display:flex;
          gap:24px;
          width:100%;
          padding:10px 0;
          will-change:transform;
        }
        .tm-status-row{
          display:flex;
          gap:12px;
          align-items:center;
          padding:0 22px;
          animation:tmMarquee 28s linear infinite;
        }
        .tm-statusbar.is-paused .tm-status-row{
          animation-play-state:paused;
        }
        @keyframes tmMarquee{
          0%{ transform:translateX(0); }
          100%{ transform:translateX(-100%); }
        }

        .tm-status-chip{
          display:inline-flex;
          align-items:center;
          padding:8px 12px;
          border-radius:999px;
          background:rgba(15,23,42,0.03);
          border:1px solid rgba(15,23,42,0.08);
          color:rgba(15,23,42,0.86);
          font-size:12px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          font-weight:650;
          white-space:nowrap;
        }
        .tm-status-chip.is-hot{
          border-color:rgba(57,255,20,0.45);
          background:linear-gradient(180deg, rgba(57,255,20,0.14), rgba(255,255,255,0.86));
          box-shadow:0 14px 28px rgba(15,23,42,0.10);
        }

        /* fade masks */
        .tm-status-mask{
          position:absolute;
          top:0;
          bottom:0;
          width:86px;
          pointer-events:none;
          z-index:2;
        }
        .tm-status-mask-left{
          left:0;
          background:linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%);
        }
        .tm-status-mask-right{
          right:0;
          background:linear-gradient(270deg, #ffffff 0%, rgba(255,255,255,0) 100%);
        }

        /* HEADER */
        .tm-header{
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(10px);
          border-bottom:1px solid var(--tm-line);
        }
        .tm-header-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:14px 26px;
          display:grid;
          grid-template-columns:auto 1fr auto;
          align-items:center;
          column-gap:26px;
        }

        .tm-logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none}
        .tm-logo-img{height:62px;width:auto;display:block;max-width:280px}

        .tm-nav{
          display:flex;
          justify-content:center;
          gap:22px;
          flex-wrap:nowrap;
          white-space:nowrap;
          min-width:0;
        }
        .tm-nav-link{
          position:relative;
          text-decoration:none;
          color:var(--tm-ink);
          font-size:16.5px; /* larger */
          letter-spacing:0.08em;
          font-weight:520;
          padding:10px 4px;
          white-space:nowrap;
          opacity:0.86;
          text-transform:uppercase;
          transition:opacity .15s ease, transform .15s ease;
        }
        .tm-nav-link:hover{opacity:1;transform:translateY(-1px)}
        .tm-nav-link::after{
          content:"";
          position:absolute;
          left:4px; right:4px;
          bottom:6px;
          height:2px;
          border-radius:2px;
          background:var(--tm-green);
          transform:scaleX(0);
          transform-origin:left;
          transition:transform .18s ease;
        }
        .tm-nav-link:hover::after{transform:scaleX(1)}
        .tm-nav-link.active{opacity:1}
        .tm-nav-link.active::after{transform:scaleX(1)}

        .tm-header-actions{
          display:flex;
          align-items:center;
          gap:10px;
          white-space:nowrap;
          flex-shrink:0;
        }

        /* keep your premium pills */
        .tm-call,
        .tm-cta{
          position:relative;
          display:inline-flex;
          align-items:center;
          gap:10px;
          height:40px;
          padding:0 16px;
          border-radius:999px;
          text-decoration:none;
          white-space:nowrap;
          font-size:12.5px;
          font-weight:600;
          letter-spacing:0.10em;
          text-transform:uppercase;
          color:var(--tm-ink);
          border:1px solid rgba(57,255,20,0.40);
          background:linear-gradient(180deg, rgba(57,255,20,0.18), rgba(57,255,20,0.06));
          box-shadow:0 14px 30px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.7);
          transition:transform .15s ease, box-shadow .15s ease, background .15s ease, border-color .15s ease;
        }
        .tm-call::before,
        .tm-cta::before{
          content:"";
          width:10px;
          height:10px;
          border-radius:999px;
          background:
            radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255,255,255,0) 40%),
            radial-gradient(circle at center, var(--tm-green) 0%, var(--tm-green) 62%, rgba(57,255,20,0.18) 100%);
          box-shadow:0 0 0 4px rgba(57,255,20,0.14);
          flex:0 0 auto;
        }
        .tm-call:hover,
        .tm-cta:hover{
          transform:translateY(-1px);
          border-color:rgba(57,255,20,0.55);
          box-shadow:0 20px 44px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.8);
          background:linear-gradient(180deg, rgba(255,255,255,0.94), rgba(57,255,20,0.08));
        }

        /* TRUST STRIP (official, dark, no pills, no checkmarks) */
        .tm-trust{
          border-bottom:1px solid rgba(255,255,255,0.06);
          background:linear-gradient(180deg, #101828, #0b1220);
        }
        .tm-trust-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:12px 26px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:18px;
          flex-wrap:wrap;
        }
        .tm-trust-item{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:0;
          color:rgba(255,255,255,0.92);
          letter-spacing:0.12em;
          text-transform:uppercase;
          font-weight:700;
          font-size:12px;
          white-space:nowrap;
        }
        .tm-seal{
          width:22px;
          height:22px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:999px;
          color:rgba(255,255,255,0.92);
          background:radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), rgba(255,255,255,0) 60%),
                     linear-gradient(180deg, rgba(57,255,20,0.18), rgba(57,255,20,0.06));
          border:1px solid rgba(57,255,20,0.26);
          box-shadow:0 18px 36px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
          flex:0 0 auto;
        }
        .tm-trust-text{ opacity:0.92; }

        .tm-main{flex:1;width:100%}

        /* FOOTER */
        .tm-footer{border-top:1px solid var(--tm-line);background:#fff}
        .tm-footer-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:24px 26px;
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:16px;
          flex-wrap:wrap;
        }
        .tm-footer-left{display:flex;flex-direction:column;gap:6px}
        .tm-footer-brand{font-weight:800;color:#000}
        .tm-footer-sub{color:#6b7280;font-size:13px;max-width:420px}
        .tm-footer-right{display:flex;gap:14px;flex-wrap:wrap;align-items:center}
        .tm-footer-link{text-decoration:none;color:#111827;font-size:13px;padding:8px 10px;border-radius:10px}
        .tm-footer-link:hover{background:#f3f4f6}

        /* RESPONSIVE: stop overlap and keep nav usable */
        @media (max-width: 1100px){
          .tm-header-inner{
            grid-template-columns:auto 1fr;
            grid-template-rows:auto auto;
            row-gap:10px;
          }
          .tm-header-actions{justify-content:flex-end}
          .tm-nav{
            grid-column:1 / -1;
            justify-content:flex-start;
            overflow-x:auto;
            -webkit-overflow-scrolling:touch;
            padding-bottom:6px;
            scrollbar-width:none;
          }
          .tm-nav::-webkit-scrollbar{display:none}
        }
        @media (max-width: 520px){
          .tm-logo-img{height:54px}
          .tm-call,.tm-cta{height:38px;padding:0 12px}
          .tm-status-mask{width:64px}
        }
      `}</style>
    </div>
  );
}
