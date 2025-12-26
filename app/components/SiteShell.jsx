"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/online-estimate", label: "Get an Estimate" },
  { href: "/vetting", label: "Carrier Standards" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

const TRUST = [
  { tag: "USDOT", text: "USDOT Compliant" },
  { tag: "INSURED", text: "Bonded and Insured" },
  { tag: "FMCSA", text: "FMCSA Authorized Motor Carriers" },
  { tag: "BROKER", text: "Licensed Interstate Moving Broker" },
];

const STATUS = [
  { text: "Instant AI quotes", key: "online-estimate", href: "/online-estimate" },
  { text: "Vetted mover network", key: "vetting", href: "/vetting" },
  { text: "Real time updates", key: "home", href: "/" },
  { text: "Virtual video consults", key: "book", href: "/book" },
  { text: "Live review and claims monitoring", key: "home", href: "/" },
  { text: "Load tracking", key: "home", href: "/" },
];

function getRouteKey(path) {
  const route = (path || "/").toLowerCase();
  if (route.startsWith("/online-estimate")) return "online-estimate";
  if (route.startsWith("/vetting")) return "vetting";
  if (route.startsWith("/book")) return "book";
  return "home";
}

export default function SiteShell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const headerRef = useRef(null);

  const routeKey = useMemo(() => getRouteKey(path), [path]);
  const loop = useMemo(() => [...STATUS, ...STATUS], []);

  // page-aware highlighting
  useEffect(() => {
    document.documentElement.setAttribute("data-tm-route", routeKey);
  }, [routeKey]);

  // pause marquee while user scrolls (class-only, smooth)
  useEffect(() => {
    let t = null;
    const onScroll = () => {
      document.documentElement.classList.add("tm-scrolling");
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        document.documentElement.classList.remove("tm-scrolling");
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (t) window.clearTimeout(t);
    };
  }, []);

  function onStatusClick(item) {
    const targetHref = item.href || "/";
    const current = (path || "/").toLowerCase();
    const next = targetHref.toLowerCase();

    if (current !== next) {
      router.push(targetHref);
      return;
    }

    const id = `tm-${item.key}`;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="tm-shell">
      {/* STATUS STRIP (TOP) */}
      <div className="tm-status" aria-label="Platform capabilities">
        <div className="tm-status-mask tm-status-mask-left" aria-hidden="true" />
        <div className="tm-status-mask tm-status-mask-right" aria-hidden="true" />

        <div className="tm-status-track">
          <div className="tm-status-inner">
            {loop.map((s, i) => (
              <button
                key={`${s.text}-${i}`}
                type="button"
                className="tm-status-item"
                data-page={s.key}
                onClick={() => onStatusClick(s)}
              >
                <span className="tm-status-dot" aria-hidden="true" />
                <span className="tm-status-text">{s.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header ref={headerRef} className="tm-header" role="banner">
        <div className="tm-header-inner">
          <Link href="/" className="tm-logo" aria-label="TruMove Home">
            <img className="tm-logo-img" src="/logo.png" alt="TruMove" />
          </Link>

          <nav className="tm-nav" aria-label="Primary navigation">
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

          <div className="tm-header-actions" aria-label="Contact actions">
            <a className="tm-call" href="tel:+10000000000">
              Call Us Now
            </a>
            <Link className="tm-cta" href="/book">
              Book a Consult
            </Link>
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <section className="tm-trust" aria-label="Compliance and authority">
        <div className="tm-trust-inner">
          <div className="tm-trust-items" role="list">
            {TRUST.map((t, idx) => (
              <div key={t.tag} className="tm-trust-item" role="listitem">
                <span className="tm-trust-badge" aria-hidden="true">
                  <span className="tm-trust-badge-top">Verified</span>
                  <span className="tm-trust-badge-tag">{t.tag}</span>
                </span>

                <span className="tm-trust-text">{t.text}</span>

                {idx < TRUST.length - 1 ? (
                  <span className="tm-trust-divider" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="tm-main" role="main">
        {children}
      </main>

      <footer className="tm-footer" role="contentinfo">
        <div className="tm-footer-inner">
          <div className="tm-footer-left">
            <div className="tm-footer-brand">TruMove</div>
            <div className="tm-footer-sub">
              AI-powered moving quotes and carrier coordination.
            </div>
          </div>

          <nav className="tm-footer-right" aria-label="Footer navigation">
            <Link className="tm-footer-link" href="/vetting">
              Carrier Standards
            </Link>
            <Link className="tm-footer-link" href="/book">
              Book a Consult
            </Link>
            <Link className="tm-footer-link" href="/privacy">
              Privacy
            </Link>
            <Link className="tm-footer-link" href="/terms">
              Terms
            </Link>
          </nav>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --tm-green: #39ff14;
          --tm-ink: #0f172a;
          --tm-line: rgba(15, 23, 42, 0.10);
          --tm-max: 1560px;

          --tm-status-h: 44px;
          --tm-marquee-normal: 34s;
          --tm-marquee-fast: 18s;
        }

        .tm-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fff;
          color: var(--tm-ink);
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        /* STATUS STRIP */
        .tm-status {
          position: sticky;
          top: 0;
          z-index: 90;
          height: var(--tm-status-h);
          border-bottom: 1px solid var(--tm-line);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), #ffffff);
          overflow: hidden;
        }

        .tm-status-track {
          height: 100%;
          overflow: hidden;
        }

        .tm-status-inner {
          height: 100%;
          display: flex;
          align-items: center;
          width: max-content;
          gap: 0;
          animation: tm-marquee var(--tm-marquee-normal) linear infinite;
          will-change: transform;
        }

        @keyframes tm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Pause behavior */
        html.tm-scrolling .tm-status-inner { animation-play-state: paused; }
        .tm-status:hover .tm-status-inner { animation-play-state: paused; }

        /* Speed ramp on hover */
        .tm-status:hover .tm-status-inner { animation-duration: var(--tm-marquee-fast); }

        .tm-status-item {
          appearance: none;
          border: 0;
          background: transparent;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 650;
          white-space: nowrap;
          color: rgba(15, 23, 42, 0.72);
          position: relative;
          cursor: pointer;
        }

        .tm-status-item:hover { color: rgba(15, 23, 42, 0.92); }

        .tm-status-item:focus-visible {
          outline: 2px solid rgba(57, 255, 20, 0.45);
          outline-offset: 2px;
          border-radius: 10px;
        }

        .tm-status-item::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 16px;
          background: rgba(15, 23, 42, 0.14);
        }

        .tm-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--tm-green);
          box-shadow: 0 0 0 5px rgba(57, 255, 20, 0.14);
          flex: 0 0 auto;
        }

        /* Page-aware highlighting */
        html[data-tm-route="online-estimate"] .tm-status-item[data-page="online-estimate"],
        html[data-tm-route="vetting"] .tm-status-item[data-page="vetting"],
        html[data-tm-route="book"] .tm-status-item[data-page="book"],
        html[data-tm-route="home"] .tm-status-item[data-page="home"] {
          color: rgba(15, 23, 42, 0.92);
        }

        /* Edge fades */
        .tm-status-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 90px;
          pointer-events: none;
          z-index: 2;
        }
        .tm-status-mask-left {
          left: 0;
          background: linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
        }
        .tm-status-mask-right {
          right: 0;
          background: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
        }

        /* HEADER */
        .tm-header {
          position: sticky;
          top: var(--tm-status-h);
          z-index: 80;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--tm-line);
        }

        .tm-header-inner {
          max-width: var(--tm-max);
          margin: 0 auto;
          padding: 16px 34px;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          column-gap: 32px;
        }

        .tm-logo { display: flex; align-items: center; flex-shrink: 0; text-decoration: none; }
        .tm-logo-img { height: 62px; width: auto; display: block; max-width: 280px; }

        .tm-nav {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: nowrap;
          white-space: nowrap;
          min-width: 0;
        }

        .tm-nav-link {
          position: relative;
          text-decoration: none;
          color: var(--tm-ink);
          font-size: 18px;
          line-height: 1;
          letter-spacing: 0.09em;
          font-weight: 480;
          padding: 14px 6px;
          white-space: nowrap;
          opacity: 0.86;
          text-transform: uppercase;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .tm-nav-link:hover { opacity: 1; transform: translateY(-1px); }
        .tm-nav-link::after {
          content: "";
          position: absolute;
          left: 4px;
          right: 4px;
          bottom: 8px;
          height: 2px;
          border-radius: 2px;
          background: var(--tm-green);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.18s ease;
        }
        .tm-nav-link:hover::after { transform: scaleX(1); }
        .tm-nav-link.active { opacity: 1; }
        .tm-nav-link.active::after { transform: scaleX(1); }

        .tm-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .tm-call,
        .tm-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 40px;
          padding: 0 16px;
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--tm-ink);
          border: 1px solid rgba(57, 255, 20, 0.40);
          background: linear-gradient(180deg, rgba(57, 255, 20, 0.18), rgba(57, 255, 20, 0.06));
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.7);
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, border-color 0.15s ease;
        }

        .tm-call::before,
        .tm-cta::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255, 255, 255, 0) 40%),
            radial-gradient(circle at center, var(--tm-green) 0%, var(--tm-green) 62%, rgba(57, 255, 20, 0.18) 100%);
          box-shadow: 0 0 0 4px rgba(57, 255, 20, 0.14);
          flex: 0 0 auto;
        }

        .tm-call:hover,
        .tm-cta:hover {
          transform: translateY(-1px);
          border-color: rgba(57, 255, 20, 0.55);
          box-shadow: 0 20px 44px rgba(15, 23, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(57, 255, 20, 0.08));
        }

        /* TRUST STRIP */
        .tm-trust {
          border-bottom: 1px solid rgba(255, 255, 255, 0.10);
          background: linear-gradient(180deg, #0b1220, #070b14);
        }
        .tm-trust-inner {
          max-width: var(--tm-max);
          margin: 0 auto;
          padding: 12px 22px;
        }
        .tm-trust-items {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tm-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
        }
        .tm-trust-divider {
          width: 1px;
          height: 22px;
          background: rgba(255, 255, 255, 0.18);
          display: inline-block;
          margin-left: 14px;
        }
        .tm-trust-badge {
          width: 56px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 55%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.02));
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.10);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1;
          flex: 0 0 auto;
        }
        .tm-trust-badge-top {
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.66);
          font-weight: 700;
        }
        .tm-trust-badge-tag {
          margin-top: 4px;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
          font-weight: 800;
        }
        .tm-trust-text {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 650;
          color: rgba(255, 255, 255, 0.92);
        }

        /* Hide trust strip on home page (we will integrate it in hero) */
        html[data-tm-route="home"] .tm-trust { display: none; }

        .tm-main { flex: 1; width: 100%; }

        /* FOOTER */
        .tm-footer {
          border-top: 1px solid var(--tm-line);
          background: #fff;
        }
        .tm-footer-inner {
          max-width: var(--tm-max);
          margin: 0 auto;
          padding: 24px 22px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .tm-footer-left { display: flex; flex-direction: column; gap: 6px; }
        .tm-footer-brand { font-weight: 800; color: #000; }
        .tm-footer-sub { color: #6b7280; font-size: 13px; max-width: 420px; }
        .tm-footer-right { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
        .tm-footer-link {
          text-decoration: none;
          color: #111827;
          font-size: 13px;
          padding: 8px 10px;
          border-radius: 10px;
        }
        .tm-footer-link:hover { background: #f3f4f6; }

        @media (max-width: 1180px) {
          .tm-header-inner {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
            row-gap: 10px;
          }
          .tm-header-actions { justify-content: flex-end; }
          .tm-nav {
            grid-column: 1 / -1;
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
            scrollbar-width: none;
          }
          .tm-nav::-webkit-scrollbar { display: none; }
          .tm-nav-link { font-size: 16px; padding: 12px 6px; }
        }

        @media (max-width: 520px) {
          .tm-logo-img { height: 54px; }
          .tm-call, .tm-cta { height: 38px; padding: 0 12px; }
          .tm-status-mask { width: 64px; }
        }
      `}</style>
    </div>
  );
}
