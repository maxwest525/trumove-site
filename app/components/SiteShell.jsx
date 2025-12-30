"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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

// Status items: key is used for page-aware highlight + snap behavior
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
  const statusStripRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState("normal"); // "normal" | "fast"
  const scrollT = useRef(null);

  const routeKey = useMemo(() => getRouteKey(path), [path]);

  // Page-aware highlighting (CSS targets html[data-tm-route="..."])
useEffect(() => {
  document.documentElement.setAttribute("data-tm-route", routeKey);
  document.documentElement.setAttribute("data-tm-badge", "shield"); // circle | shield | plaque
}, [routeKey]);

  // Pause while user scrolls (very light touch)
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.classList.add("tm-scrolling");
      setPaused(true);
      if (scrollT.current) window.clearTimeout(scrollT.current);
      scrollT.current = window.setTimeout(() => {
        document.documentElement.classList.remove("tm-scrolling");
        setPaused(false);
      }, 160);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollT.current) window.clearTimeout(scrollT.current);
    };
  }, []);

  // Auto-pause when header enters viewport (IntersectionObserver)
  // This pauses motion when the "chrome" is present, which reads more enterprise.
  useEffect(() => {
    if (!headerRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // If header is meaningfully visible, pause the marquee
        if (entry && entry.isIntersecting) setPaused(true);
        else setPaused(false);
      },
      { threshold: 0.65 }
    );

    obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const loop = useMemo(() => [...STATUS, ...STATUS], []);

  function snapTo(item) {
    // Snap-to-section behavior:
    // - If item has href and you're not on it, route there
    // - If you're already there, scroll to a section id if it exists
    //   Convention: #tm-{key} (you can add these ids later)
    const targetHref = item.href || "/";
    const onSamePage = (path || "/") === targetHref;

    if (!onSamePage) {
      router.push(targetHref);
      return;
    }

    const id = `tm-${item.key}`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="tm-shell">
      {/* STATUS STRIP (TOP) */}
      <div
        ref={statusStripRef}
        className={[
          "tm-status",
          paused ? "is-paused" : "",
          speed === "fast" ? "is-fast" : "",
        ].join(" ")}
        aria-label="Platform capabilities"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="tm-status-mask tm-status-mask-left" aria-hidden="true" />
        <div className="tm-status-mask tm-status-mask-right" aria-hidden="true" />

        <div className="tm-status-track" role="list">
          <div className="tm-status-inner" role="presentation">
            {loop.map((s, i) => (
              <button
                key={`${s.text}-${i}`}
                type="button"
                className="tm-status-item"
                data-page={s.key}
                role="listitem"
                onClick={() => snapTo(s)}
                aria-label={s.text}
              >
                <span className="tm-status-dot" aria-hidden="true" />
                <span className="tm-status-text">{s.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header ref={headerRef} className="tm-header">
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

      {/* TRUST STRIP (OFFICIAL PLAQUES) */}
      <div className="tm-trust" aria-label="Compliance and authority">
        <div className="tm-trust-inner">
          <div className="tm-trust-items">
{TRUST.map((t) => (
  <span key={t.tag} className="tm-trust-item">
    <span className="tm-trust-badge" data-tag={t.tag} aria-hidden="true" />
    <span className="tm-trust-text">{t.text}</span>
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
          --tm-status-h:44px;
          --tm-marquee-normal:34s;
          --tm-marquee-fast:18s;
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
          z-index:90;
          height:var(--tm-status-h);
          border-bottom:1px solid var(--tm-line);
          background:linear-gradient(180deg, rgba(255,255,255,0.98), #ffffff);
          overflow:hidden;
        }

        .tm-status-track{ height:100%; overflow:hidden; }
        .tm-status-inner{
          height:100%;
          display:flex;
          align-items:center;
          width:max-content;
          gap:0;
          animation:tm-marquee var(--tm-marquee-normal) linear infinite;
          will-change:transform;
        }

        /* pause behavior */
        html.tm-scrolling .tm-status-inner{ animation-play-state:paused; }
        .tm-status.is-paused .tm-status-inner{ animation-play-state:paused; }

        /* speed ramp on hover */
        .tm-status.is-fast .tm-status-inner{
          animation-duration:var(--tm-marquee-fast);
        }

        @keyframes tm-marquee{
          from{ transform:translateX(0); }
          to{ transform:translateX(-50%); }
        }

        /* items: enterprise, no pills */
        .tm-status-item{
          appearance:none;
          border:0;
          background:transparent;
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
          cursor:pointer;
        }

        .tm-status-item:focus-visible{
          outline:2px solid rgba(57,255,20,0.45);
          outline-offset:2px;
          border-radius:10px;
        }

        /* subtle divider */
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

        .tm-status-text{ display:inline-block; }

        /* Page-aware highlighting (very clean) */
        html[data-tm-route="online-estimate"] .tm-status-item[data-page="online-estimate"],
        html[data-tm-route="vetting"] .tm-status-item[data-page="vetting"],
        html[data-tm-route="book"] .tm-status-item[data-page="book"],
        html[data-tm-route="home"] .tm-status-item[data-page="home"]{
          color:rgba(15,23,42,0.92);
        }

        /* edge fades */
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

        /* HEADER */
        .tm-header{
          position:sticky;
          top:var(--tm-status-h);
          z-index:80;
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
        .tm-logo-img{
          height:62px;
          width:auto;
          display:block;
          max-width:280px;
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
          position:relative;
          text-decoration:none;
          color:var(--tm-ink);
          font-size:19.5px;
          letter-spacing:0.08em;
          font-weight:500;
          padding:12px 6px;
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

        /* premium pills */
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

/* =========================================================
   TRUST STRIP – GOV / REGISTRY SEAL (BLACK, SPACED, BRIGHT)
   ========================================================= */

.tm-trust{
  border-bottom:1px solid rgba(255,255,255,0.14);
  background:linear-gradient(180deg,#070912,#050610);
}

.tm-trust-inner{
  max-width:var(--tm-max);
  margin:0 auto;
  padding:3px 12px;
  position:relative;
}

.tm-trust-inner::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  opacity:0.08;
  background:repeating-linear-gradient(
    135deg,
    rgba(255,255,255,0.06) 0px,
    rgba(255,255,255,0.06) 1px,
    rgba(0,0,0,0) 1px,
    rgba(0,0,0,0) 8px
  );
}

.tm-trust-items{
  position:relative;
  z-index:1;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:28px;
  flex-wrap:wrap;
}


.tm-trust-item{
  display:inline-flex;
  align-items:center;
  gap:14px;
  white-space:nowrap;
}

/* brighter, more “registry” */
.tm-trust-text{
  font-size:10.5px;
  letter-spacing:0.16em;
  text-transform:uppercase;
  font-weight:800;
  color:rgba(255,255,255,0.96);
}

/* BADGE: registry stamp, not a circle */
.tm-trust-badge{
  width:22px;
  height:22px;
  position:relative;
  display:inline-block;
  flex:0 0 auto;

  /* make it look like an official stamp */
  clip-path:polygon(
    25% 6%,
    75% 6%,
    94% 25%,
    94% 75%,
    75% 94%,
    25% 94%,
    6% 75%,
    6% 25%
  );

  background:linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06));
  border:1px solid rgba(255,255,255,0.78);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.22),
    inset 0 -1px 0 rgba(0,0,0,0.65),
    0 1px 0 rgba(0,0,0,0.60);
  overflow:hidden;
}

/* inner “seal” ring */
.tm-trust-badge::before{
  content:"";
  position:absolute;
  inset:4px;

  /* inner shape slightly rounded */
  clip-path:polygon(
    26% 8%,
    74% 8%,
    92% 26%,
    92% 74%,
    74% 92%,
    26% 92%,
    8% 74%,
    8% 26%
  );

  border:1px solid rgba(255,255,255,0.44);
  background:
    radial-gradient(circle at 35% 30%, rgba(255,255,255,0.40), rgba(255,255,255,0) 60%),
    radial-gradient(circle at center, rgba(0,0,0,0.25), rgba(0,0,0,0) 65%);
  opacity:0.95;
}

/* in case any old spans still exist */
.tm-trust-badge-top,
.tm-trust-badge-tag{
  display:none !important;
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
        @media (max-width: 1280px){
          :root{ --tm-max:1320px; }
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
          .tm-nav-link{font-size:15px}
        }

        @media (max-width: 520px){
          .tm-logo-img{height:54px}
          .tm-call,.tm-cta{height:38px;padding:0 12px}
          .tm-status-mask{width:64px}
        }
        .tru-hero-formcard{
  border-radius:18px;
  border:1px solid rgba(15,23,42,0.10);
  box-shadow:0 18px 50px rgba(15,23,42,0.10);
}

.tru-hero-form-title{
  font-size:18px;
  font-weight:700;
  letter-spacing:-0.02em;
  margin-bottom:6px;
}

.tru-hero-form-sub{
  color:rgba(15,23,42,0.70);
  font-size:13px;
  line-height:1.4;
  margin-bottom:14px;
}

.tru-hero-form{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.tru-hero-form-row.two{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
}

.tru-hero-input,
.tru-hero-select{
  width:100%;
  height:46px;
  border-radius:12px;
  border:1px solid rgba(15,23,42,0.12);
  padding:0 14px;
  outline:none;
  transition: box-shadow .15s ease, border-color .15s ease, transform .15s ease;
  background:#fff;
}

.tru-hero-input:focus,
.tru-hero-select:focus{
  border-color:rgba(57,255,20,0.55);
  box-shadow:0 0 0 5px rgba(57,255,20,0.16);
}

.tru-hero-form-btn{
  height:46px;
  border-radius:999px;
  border:1px solid rgba(57,255,20,0.45);
  background:linear-gradient(180deg, rgba(57,255,20,0.22), rgba(57,255,20,0.10));
  font-weight:650;
  letter-spacing:0.08em;
  text-transform:uppercase;
  cursor:pointer;
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
}

.tru-hero-form-btn:hover{
  transform:translateY(-1px);
  box-shadow:0 18px 44px rgba(15,23,42,0.14);
  background:linear-gradient(180deg, rgba(57,255,20,0.26), rgba(57,255,20,0.12));
}

.tru-hero-form-foot{
  margin-top:6px;
  font-size:12px;
  color:rgba(15,23,42,0.60);
}

/* Hover: slightly brighter, crisp, tiny lift */
.tm-trust .tm-trust-item{
  transition: transform .14s ease;
}

.tm-trust .tm-trust-item:hover{
  transform: translateY(-1px);
}

.tm-trust .tm-trust-item:hover .tm-trust-text{
  color: rgba(255,255,255,1);
}

.tm-trust .tm-trust-item:hover .tm-trust-badge{
  border-color: rgba(255,255,255,0.92);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.30),
    inset 0 -1px 0 rgba(0,0,0,0.70),
    0 0 0 5px rgba(57,255,20,0.10),
    0 10px 22px rgba(0,0,0,0.35);
}

.tm-trust .tm-trust-item:hover .tm-trust-badge::after{
  opacity: 1;
  transform: scale(1.03);
}

.tm-trust .tm-trust-badge::after{
  transition: opacity .14s ease, transform .14s ease;
}

/* Micro emboss pulse while the user scrolls */
.tm-trust .tm-trust-badge{
  transition: box-shadow .18s ease, transform .18s ease, border-color .18s ease;
}

html.tm-scrolling .tm-trust .tm-trust-badge{
  transform: translateY(0.5px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.34),
    inset 0 -1px 0 rgba(0,0,0,0.78),
    0 0 0 6px rgba(57,255,20,0.10),
    0 12px 26px rgba(0,0,0,0.38);
}

html.tm-scrolling .tm-trust .tm-trust-text{
  color: rgba(255,255,255,1);
}
/* =========================================
   TRUST BADGE ENHANCEMENTS: HOVER
   ========================================= */

.tm-trust .tm-trust-item:hover .tm-trust-text{
  color:rgba(255,255,255,0.98);
}

.tm-trust .tm-trust-item:hover .tm-trust-badge{
  transform: translateY(-0.5px);
  border-color: rgba(255,255,255,0.92);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.28),
    inset 0 -1px 0 rgba(0,0,0,0.68),
    0 8px 18px rgba(0,0,0,0.45);
}

.tm-trust .tm-trust-item:hover .tm-trust-badge::after{
  opacity: 1;
  transform: scale(1.03);
}

.tm-trust .tm-trust-badge,
.tm-trust .tm-trust-badge::after{
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease,
    opacity 160ms ease;
}
/* =========================================
   TRUST BADGE ENHANCEMENTS: MICRO EMBOSS ON SCROLL
   ========================================= */

@keyframes tm-emboss-pop{
  0%   { transform: translateY(0) scale(1); filter: brightness(1); }
  40%  { transform: translateY(-0.5px) scale(1.02); filter: brightness(1.06); }
  100% { transform: translateY(0) scale(1); filter: brightness(1); }
}

/* While scrolling, soften the seal so it feels less noisy */
html.tm-scrolling .tm-trust .tm-trust-badge{
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.18),
    inset 0 -1px 0 rgba(0,0,0,0.55),
    0 0 0 rgba(0,0,0,0);
  border-color: rgba(255,255,255,0.60);
}

/* When scrolling stops, pop the emboss */
html:not(.tm-scrolling) .tm-trust .tm-trust-badge{
  animation: tm-emboss-pop 280ms ease-out;
}
/* =========================================
   TRUST BADGE SHAPE SYSTEM (ONE LINE TO SWITCH)
   ========================================= */

/* Pick one:
   circle | shield | plaque

/* shield */
:root[style*="--tm-trust-shape: shield"] .tm-trust .tm-trust-badge{
  border-radius: 10px 10px 14px 14px;
  clip-path: polygon(
    50% 4%,
    88% 18%,
    88% 54%,
    50% 96%,
    12% 54%,
    12% 18%
  );
}


      `}</style>
    </div>
  );
}
