"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/online-estimate", label: "Get an Estimate" },
  { href: "/vetting", label: "Carrier Standards" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function SiteShell({ children }) {
  const path = usePathname();

  return (
    <div className="tm-shell">
      {/* HEADER STACK (sticky) */}
      <header className="tm-header">
        {/* Top row: logo + nav + CTAs */}
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

        {/* Trust strip (dark, official) */}
        <div className="tm-trust">
          <div className="tm-trust-inner">
            <div className="tm-trust-left" aria-label="Compliance badges">
              <span className="tm-trust-item">
                <span className="tm-trust-mark" aria-hidden="true" />
                USDOT compliant
              </span>
              <span className="tm-trust-sep" aria-hidden="true">•</span>

              <span className="tm-trust-item">
                <span className="tm-trust-mark" aria-hidden="true" />
                Bonded and insured
              </span>
              <span className="tm-trust-sep" aria-hidden="true">•</span>

              <span className="tm-trust-item">
                <span className="tm-trust-mark" aria-hidden="true" />
                FMCSA authorized motor carriers
              </span>
              <span className="tm-trust-sep" aria-hidden="true">•</span>

              <span className="tm-trust-item">
                <span className="tm-trust-mark" aria-hidden="true" />
                Licensed interstate moving broker
              </span>
            </div>

            <div className="tm-trust-right" aria-label="Positioning">
              <span className="tm-trust-mini">Enterprise-grade quoting</span>
              <span className="tm-trust-sep" aria-hidden="true">•</span>
              <span className="tm-trust-mini">Vetted carrier network</span>
            </div>
          </div>
        </div>

        {/* Status strip (light, feature rail) */}
        <div className="tm-status" aria-label="Platform capabilities">
          <div className="tm-status-inner">
            <span className="tm-status-item">Instant AI quotes</span>
            <span className="tm-status-item">Vetted mover network</span>
            <span className="tm-status-item">Real time updates</span>
            <span className="tm-status-item">Virtual video consults</span>
            <span className="tm-status-item">Live review and claims monitoring</span>
            <span className="tm-status-item">Load tracking</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="tm-main">{children}</main>

      {/* FOOTER */}
      <footer className="tm-footer">
        <div className="tm-footer-inner">
          <div className="tm-footer-left">
            <div className="tm-footer-brand">TruMove</div>
            <div className="tm-footer-sub">
              AI-powered moving quotes and carrier coordination.
            </div>
          </div>

          <div className="tm-footer-right">
            <Link className="tm-footer-link" href="/vetting">Carrier Standards</Link>
            <Link className="tm-footer-link" href="/book">Book a Consult</Link>
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
          --tm-max:1320px;
        }

        .tm-shell{
          min-height:100vh;
          display:flex;
          flex-direction:column;
          background:#fff;
          color:var(--tm-ink);
          font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
        }

        /* HEADER STACK */
        .tm-header{
          position:sticky;
          top:0;
          z-index:60;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(10px);
          border-bottom:1px solid var(--tm-line);
        }

        .tm-header-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:14px 22px;
          display:grid;
          grid-template-columns:auto 1fr auto;
          align-items:center;
          column-gap:22px;
        }

        .tm-logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none}
        .tm-logo-img{
          height:62px;
          width:auto;
          display:block;
          max-width:260px;
        }

        /* NAV */
        .tm-nav{
          display:flex;
          justify-content:center;
          gap:20px;
          white-space:nowrap;
          min-width:0;
          overflow:hidden;
        }

        .tm-nav-link{
          position:relative;
          text-decoration:none;
          color:var(--tm-ink);
          font-size:15.5px;
          letter-spacing:0.08em;
          font-weight:500;
          padding:10px 4px;
          opacity:0.86;
          text-transform:uppercase;
          transition:opacity .15s ease, transform .15s ease;
          flex:0 0 auto;
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

        /* CTAs */
        .tm-header-actions{
          display:flex;
          align-items:center;
          gap:10px;
          white-space:nowrap;
          flex-shrink:0;
        }

        .tm-call,
        .tm-cta{
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

        /* TRUST STRIP (official) */
        .tm-trust{
          border-top:1px solid rgba(15,23,42,0.06);
          border-bottom:1px solid rgba(255,255,255,0.06);
          background:linear-gradient(180deg, #0f172a, #0b1220);
        }

        .tm-trust-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:10px 22px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:14px;
          flex-wrap:wrap;
        }

        .tm-trust-left{
          display:flex;
          align-items:center;
          gap:12px;
          flex-wrap:wrap;
          min-width:0;
        }

        .tm-trust-item{
          display:inline-flex;
          align-items:center;
          gap:10px;
          color:rgba(255,255,255,0.92);
          font-size:12px;
          letter-spacing:0.12em;
          text-transform:uppercase;
          font-weight:650;
          white-space:nowrap;
        }

        .tm-trust-mark{
          width:18px;
          height:18px;
          border-radius:6px;
          border:1px solid rgba(57,255,20,0.32);
          background:
            radial-gradient(circle at 35% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%),
            linear-gradient(180deg, rgba(57,255,20,0.18), rgba(57,255,20,0.06));
          box-shadow:0 10px 22px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10);
          position:relative;
          flex:0 0 auto;
        }

        .tm-trust-mark::after{
          content:"";
          position:absolute;
          left:6px;
          top:4px;
          width:5px;
          height:9px;
          border-right:2px solid var(--tm-green);
          border-bottom:2px solid var(--tm-green);
          transform:rotate(40deg);
        }

        .tm-trust-right{
          display:flex;
          align-items:center;
          gap:10px;
          color:rgba(255,255,255,0.70);
          font-size:12px;
          letter-spacing:0.06em;
          text-transform:uppercase;
          white-space:nowrap;
        }

        .tm-trust-mini{font-weight:650}
        .tm-trust-sep{opacity:0.45}

        /* STATUS STRIP */
        .tm-status{
          border-bottom:1px solid var(--tm-line);
          background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,1));
        }

        .tm-status-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:12px 22px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:14px;
          flex-wrap:wrap;
        }

        .tm-status-item{
          display:inline-flex;
          align-items:center;
          padding:8px 12px;
          border-radius:999px;
          background:rgba(15,23,42,0.03);
          border:1px solid rgba(15,23,42,0.08);
          color:rgba(15,23,42,0.88);
          font-size:12px;
          letter-spacing:0.08em;
          text-transform:uppercase;
          font-weight:600;
          white-space:nowrap;
        }

        .tm-main{flex:1;width:100%}

        /* FOOTER */
        .tm-footer{
          border-top:1px solid var(--tm-line);
          background:#fff;
        }
        .tm-footer-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:24px 22px;
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
        .tm-footer-link{
          text-decoration:none;
          color:#111827;
          font-size:13px;
          padding:8px 10px;
          border-radius:10px;
        }
        .tm-footer-link:hover{background:#f3f4f6}

        /* RESPONSIVE: prevents overlap and wrapping */
        @media (max-width: 1020px){
          .tm-header-inner{
            grid-template-columns:auto 1fr;
            grid-template-rows:auto auto;
            row-gap:10px;
          }
          .tm-header-actions{
            justify-content:flex-end;
          }
          .tm-nav{
            grid-column:1 / -1;
            justify-content:flex-start;
            overflow-x:auto;
            -webkit-overflow-scrolling:touch;
            padding-bottom:6px;
            scrollbar-width:none;
          }
          .tm-nav::-webkit-scrollbar{display:none}
          .tm-nav-link{font-size:14.5px}
        }

        @media (max-width: 520px){
          .tm-logo-img{height:54px}
          .tm-call,.tm-cta{height:38px;padding:0 12px}
          .tm-trust-right{display:none}
        }
      `}</style>
    </div>
  );
}
