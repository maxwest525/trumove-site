"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/online-estimate", label: "Get an Estimate" },
  { href: "/vetting", label: "Carrier Standards" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book a Consult" },
];

const TRUST = [
  { tag: "USDOT", text: "USDOT Compliant" },
  { tag: "INSURED", text: "Bonded and Insured" },
  { tag: "FMCSA", text: "FMCSA Authorized Motor Carriers" },
  { tag: "BROKER", text: "Licensed Interstate Moving Broker" },
];

const STATUS = [
  { text: "Instant AI quotes", key: "online-estimate" },
  { text: "Vetted mover network", key: "vetting" },
  { text: "Real time updates", key: "home" },
  { text: "Virtual video consults", key: "book" },
  { text: "Live review and claims monitoring", key: "home" },
  { text: "Load tracking", key: "home" },
];

export default function SiteShell({ children }) {
  const path = usePathname();

  useEffect(() => {
    // Pause marquee while user scrolls
    let scrollTimer = null;
    const onScroll = () => {
      document.documentElement.classList.add("tm-scrolling");
      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("tm-scrolling");
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Route key for contextual highlight
    const route = (path || "/").toLowerCase();
    let key = "home";
    if (route.startsWith("/online-estimate")) key = "online-estimate";
    else if (route.startsWith("/vetting")) key = "vetting";
    else if (route.startsWith("/book")) key = "book";
    else if (route === "/") key = "home";
    document.documentElement.setAttribute("data-tm-route", key);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer) window.clearTimeout(scrollTimer);
    };
  }, [path]);

  const loop = [...STATUS, ...STATUS];

  return (
    <div className="tm-shell">
      {/* STATUS STRIP (TOP) */}
      <div className="tm-status" aria-label="Platform capabilities">
        <div className="tm-status-mask tm-status-mask-left" aria-hidden="true" />
        <div className="tm-status-mask tm-status-mask-right" aria-hidden="true" />

        <div className="tm-status-track">
          <div className="tm-status-inner">
            {loop.map((s, i) => (
              <span
                key={`${s.text}-${i}`}
                className="tm-status-item"
                data-page={s.key}
              >
                <span className="tm-status-dot" aria-hidden="true" />
                {s.text}
              </span>
            ))}
          </div>
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

      {/* TRUST STRIP (OFFICIAL, NO CHECKMARKS) */}
      <div className="tm-trust" aria-label="Compliance and authority">
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

      <main className="tm-main">{children}</main>

      <footer className="tm-footer">
        <div className="tm-footer-inner">
          <div className="tm-footer-left">
            <div className="tm-footer-brand">TruMove</div>
            <div className="tm-footer-sub">
              AI-powered moving quotes and carrier coordination.
            </div>
          </div>

          <div className="tm-footer-right">
            <Link className="tm-footer-link" href="/vetting">
              Carrier Standards
            </Link>
            <Link className="tm-footer-link" href="/book">
              Book a consult
            </Link>
            <Link className="tm-footer-link" href="/privacy">
              Privacy
            </Link>
            <Link className="tm-footer-link" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root{
          --tm-green:#39ff14;
          --tm-ink:#0f172a;
          --tm-line:rgba(15,23,42,0.10);
          --tm-max:1480px;
        }

        .tm-shell{
          min-height:100vh;
          display:flex;
          flex-direction:column;
          background:#fff;
          color:var(--tm-ink);
          font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
        }

        /* STATUS STRIP */
        .tm-status{
          position:sticky;
          top:0;
          z-index:80;
          border-bottom:1px solid var(--tm-line);
          background:linear-gradient(180deg, rgba(255,255,255,0.98), #ffffff);
          overflow:hidden;
        }
        .tm-status-track{ overflow:hidden; }
        .tm-status-inner{
          display:flex;
          align-items:center;
          width:max-content;
          gap:0;
          animation:tm-marquee 34s linear infinite;
          will-change:transform;
        }
        html.tm-scrolling .tm-status-inner{ animation-play-state:paused; }
        .tm-status:hover .tm-status-inner{ animation-play-state:paused; }

        .tm-status-item{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:10px 18px;
          font-size:12px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          font-weight:650;
          white-space:nowrap;
          color:rgba(15,23,42,0.72);
          position:relative;
        }
        .tm-status-item::after{
          content:"";
          position:absolute;
          right:0;
          top:50%;
          transform:translateY(-50%);
          width:1px;
          height:16px;
          background:rgba(15,23,42,0.14);
        }
.tm-status-dot{
  width:6px;
  height:6px;
  border-radius:999px;
  background:var(--tm-green);
  box-shadow:0 0 0 5px rgba(57,255,20,0.14);
  flex:0 0 auto;
}

        /* fade masks */
        .tm-status-mask{
          position:absolute;
          top:0;
          bottom:0;
          width:90px;
          pointer-events:none;
          z-index:2;
        }
        .tm-status-mask-left{
          left:0;
          background:linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0));
        }
        .tm-status-mask-right{
          right:0;
          background:linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0));
        }

        /* contextual highlight by route */
        html[data-tm-route="online-estimate"] .tm-status-item[data-page="online-estimate"],
        html[data-tm-route="vetting"] .tm-status-item[data-page="vetting"],
        html[data-tm-route="book"] .tm-status-item[data-page="book"],
        html[data-tm-route="home"] .tm-status-item[data-page="home"]{
          color:rgba(15,23,42,0.92);
        }


        @keyframes tm-marquee{
          from{ transform:translateX(0); }
          to{ transform:translateX(-50%); }
        }

        /* HEADER */
        .tm-header{
          position:sticky;
          top:44px; /* sits below the status strip */
          z-index:70;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(10px);
          border-bottom:1px solid var(--tm-line);
        }

.tm-header-inner{
  max-width:var(--tm-max);
  margin:0 auto;
  padding:16px 28px;
  display:grid;
  grid-template-columns:auto minmax(0,1fr) auto;
  align-items:center;
  column-gap:32px;
}


        .tm-logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none}
        .tm-logo-img{
          height:62px;
          width:auto;
          display:block;
          max-width:260px;
        }

.tm-nav{
  display:flex;
  justify-content:center;
  gap:26px;
  flex-wrap:nowrap;
  white-space:nowrap;
  min-width:0;
}


.tm-nav-link{
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

        /* premium pills stay */
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
          background:radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255,255,255,0) 40%),
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

        /* TRUST STRIP (OFFICIAL PLAQUES) */
        .tm-trust{
          border-bottom:1px solid rgba(255,255,255,0.10);
          background:linear-gradient(180deg, #0b1220, #070b14);
        }
        .tm-trust-inner{
          max-width:var(--tm-max);
          margin:0 auto;
          padding:12px 22px;
        }
        .tm-trust-items{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:14px;
          flex-wrap:wrap;
        }
        .tm-trust-item{
          display:inline-flex;
          align-items:center;
          gap:12px;
          white-space:nowrap;
        }
        .tm-trust-divider{
          width:1px;
          height:22px;
          background:rgba(255,255,255,0.18);
          display:inline-block;
          margin-left:14px;
        }

        /* the “badge plaque” */
        .tm-trust-badge{
          width:56px;
          height:34px;
          border-radius:10px;
          border:1px solid rgba(255,255,255,0.14);
          background:
            radial-gradient(circle at 20% 10%, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%),
            linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02));
          box-shadow:0 16px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          line-height:1;
          flex:0 0 auto;
        }
        .tm-trust-badge-top{
          font-size:8px;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.66);
          font-weight:700;
        }
        .tm-trust-badge-tag{
          margin-top:4px;
          font-size:10px;
          letter-spacing:0.22em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.92);
          font-weight:800;
        }
        .tm-trust-text{
          font-size:12px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          font-weight:650;
          color:rgba(255,255,255,0.92);
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

        /* RESPONSIVE: prevent overlap */
        @media (max-width: 1320px){
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
          .tm-call,.tm-cta{height:46px;padding:0 14px}
          .tm-status-mask{width:64px}
        }
      `}</style>
    </div>
  );
}
