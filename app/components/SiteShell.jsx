"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/online-estimate", label: "Get an Estimate" },
  { href: "/vetting", label: "Carrier Standards" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

const STATUS = [
  { text: "Instant AI quotes", key: "online-estimate", href: "/online-estimate" },
  { text: "Vetted mover network", key: "vetting", href: "/vetting" },
  { text: "Virtual video consults", key: "book", href: "/book" },
  { text: "Live review monitoring", key: "home", href: "/" },
  { text: "Claims support routing", key: "home", href: "/" },
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

  const routeKey = useMemo(() => getRouteKey(path), [path]);
  const loop = useMemo(() => [...STATUS, ...STATUS, ...STATUS], []);

  useEffect(() => {
    document.documentElement.setAttribute("data-tm-route", routeKey);
  }, [routeKey]);

  useEffect(() => {
    let t = null;
    const onScroll = () => {
      document.documentElement.classList.add("tm-scrolling");
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        document.documentElement.classList.remove("tm-scrolling");
      }, 160);
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="tm-shell">
      {/* STATUS STRIP */}
      <div className="tm-status" aria-label="Platform capabilities">
        <div className="tm-status-mask tm-status-mask-left" aria-hidden="true" />
        <div className="tm-status-mask tm-status-mask-right" aria-hidden="true" />

        <div className="tm-status-track">
          <div className="tm-status-inner" aria-hidden="true">
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
      <header className="tm-header" role="banner">
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

        /* Keep shell styling neutral so page CSS can shine */
        .tm-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: var(--tm-ink);
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .tm-main {
          flex: 1;
          width: 100%;
        }

        /* STATUS STRIP */
        .tm-status {
          position: sticky;
          top: 0;
          z-index: 90;
          height: var(--tm-status-h);
          border-bottom: 1px solid var(--tm-line);
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
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
          animation: tm-marquee var(--tm-marquee-normal) linear infinite;
          will-change: transform;
        }

        @keyframes tm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }

        html.tm-scrolling .tm-status-inner { animation-play-state: paused; }
        .tm-status:hover .tm-status-inner { animation-play-state: paused; }
        .tm-status:focus-within .tm-status-inner { animation-play-state: paused; }

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
          outline: 2px solid rgba(57, 255, 20, 0.40);
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
          background: rgba(15, 23, 42, 0.12);
        }

        .tm-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--tm-green);
          box-shadow: 0 0 0 5px rgba(57, 255, 20, 0.14);
          flex: 0 0 auto;
        }

        html[data-tm-route="online-estimate"] .tm-status-item[data-page="online-estimate"],
        html[data-tm-route="vetting"] .tm-status-item[data-page="vetting"],
        html[data-tm-route="book"] .tm-status-item[data-page="book"],
        html[data-tm-route="home"] .tm-status-item[data-page="home"] {
          color: rgba(15, 23, 42, 0.92);
        }

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

        .tm-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }

        .tm-logo-img {
          height: 62px;
          width: auto;
          display: block;
          max-width: 280px;
        }

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
          font-weight: 520;
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
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--tm-ink);
          border: 1px solid rgba(15, 23, 42, 0.12);
          background: #ffffff;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.10);
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }

        .tm-call:hover,
        .tm-cta:hover {
          transform: translateY(-1px);
          border-color: rgba(57, 255, 20, 0.45);
          box-shadow: 0 20px 44px rgba(15, 23, 42, 0.14);
        }

        /* FOOTER */
        .tm-footer {
          border-top: 1px solid var(--tm-line);
          background: #ffffff;
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

        .tm-footer-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tm-footer-brand {
          font-weight: 900;
          color: #000000;
          letter-spacing: 0.02em;
        }

        .tm-footer-sub {
          color: #6b7280;
          font-size: 13px;
          max-width: 420px;
        }

        .tm-footer-right {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }

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

          .tm-nav-link {
            font-size: 16px;
            padding: 12px 6px;
          }
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
