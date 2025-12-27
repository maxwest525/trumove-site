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
    return () => {};
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

.tru-hero-title {
  font-size: 52px;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 18px;
}

.tru-hero-title span {
  color: #39ff14;
  font-weight: 900;
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

.tru-hero-form-btn.is-step{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
  padding:0 18px;
}

.step-track{
  display:flex;
  gap:10px;
  align-items:center;
}

.step{
  font-size:11px;
  font-weight:700;
  letter-spacing:0.12em;
  text-transform:uppercase;
  opacity:0.35;
  position:relative;
}

.step.active{
  opacity:1;
}

.step:not(:last-child)::after{
  content:"→";
  margin-left:10px;
  opacity:0.4;
}

.step-cta{
  font-weight:800;
  letter-spacing:0.08em;
}


.tru-hero-form-foot{
  margin-top:6px;
  font-size:12px;
  color:rgba(15,23,42,0.60);
}
.tru-hero-visual {
  position: relative;
}

.tru-hero-visual-tag {
  position: absolute;
  top: -14px;
  left: 24px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.95),
    rgba(255,255,255,0.85)
  );
  border: 1px solid rgba(15,23,42,0.12);
  box-shadow:
    0 12px 30px rgba(15,23,42,0.18),
    inset 0 1px 0 rgba(255,255,255,0.7);
  z-index: 5;
}

.tru-hero-visual-tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #39ff14;
  box-shadow: 0 0 0 4px rgba(57,255,20,0.18);
}

.tru-hero-visual-tag.is-premium{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 18px;
  border-radius:999px;
  background:linear-gradient(180deg, rgba(57,255,20,0.18), rgba(57,255,20,0.06));
  border:1px solid rgba(57,255,20,0.45);
  box-shadow:
    0 14px 40px rgba(15,23,42,0.25),
    inset 0 1px 0 rgba(255,255,255,0.7);
  font-size:12px;
  font-weight:800;
  letter-spacing:0.12em;
  text-transform:uppercase;
}

.tru-hero-visual-orb{
  width:12px;
  height:12px;
  border-radius:999px;
  background:
    radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255,255,255,0) 40%),
    radial-gradient(circle at center, var(--tm-green) 0%, var(--tm-green) 60%, rgba(57,255,20,0.15) 100%);
  box-shadow:0 0 0 5px rgba(57,255,20,0.18);
}

.tru-hero-visual-text{
  position:relative;
  top:1px;
}

.tru-hero-visual-tag.is-premium{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 18px;
  border-radius:999px;
  background:linear-gradient(180deg, rgba(57,255,20,0.18), rgba(57,255,20,0.06));
  border:1px solid rgba(57,255,20,0.45);
  box-shadow:
    0 14px 40px rgba(15,23,42,0.25),
    inset 0 1px 0 rgba(255,255,255,0.7);
  font-size:12px;
  font-weight:800;
  letter-spacing:0.12em;
  text-transform:uppercase;
}

.tru-hero-visual-orb{
  width:12px;
  height:12px;
  border-radius:999px;
  background:
    radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255,255,255,0) 40%),
    radial-gradient(circle at center, var(--tm-green) 0%, var(--tm-green) 60%, rgba(57,255,20,0.15) 100%);
  box-shadow:0 0 0 5px rgba(57,255,20,0.18);
}

.tru-hero-visual-text{
  position:relative;
  top:1px;
}

/* TRUST STRIP, HERO VARIANT (light, integrated) */
.tm-trust--hero{
  background:transparent !important;
  border-bottom:0 !important;
}

.tm-trust--hero .tm-trust-inner{
  padding:0 !important;
  max-width:none !important;
}

.tm-trust--hero .tm-trust-items{
  justify-content:flex-start;
  gap:12px;
}

.tm-trust--hero .tm-trust-divider{
  background:rgba(15,23,42,0.14) !important;
}

.tm-trust--hero .tm-trust-badge{
  border:1px solid rgba(15,23,42,0.12) !important;
  background:linear-gradient(180deg, rgba(15,23,42,0.04), rgba(15,23,42,0.01)) !important;
  box-shadow:0 12px 24px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.80) !important;
}

.tm-trust--hero .tm-trust-badge-top{
  color:rgba(15,23,42,0.55) !important;
}

.tm-trust--hero .tm-trust-badge-tag{
  color:rgba(15,23,42,0.92) !important;
}

.tm-trust--hero .tm-trust-text{
  color:rgba(15,23,42,0.88) !important;
}

/* HERO: align + upgrade "Start Your Move" pill */
.tru-hero-visual-tag.is-premium{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  gap:10px;
  padding:12px 14px;
  border-radius:16px;
  border:1px solid rgba(15,23,42,0.10);
  background:
    radial-gradient(circle at 18% 20%, rgba(57,255,20,0.20), rgba(57,255,20,0) 55%),
    linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72));
  box-shadow:0 18px 44px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.85);
  margin-bottom:14px;
}

.tru-hero-visual-orb{
  width:12px;
  height:12px;
  border-radius:999px;
  background:var(--tm-green);
  box-shadow:0 0 0 6px rgba(57,255,20,0.14);
  flex:0 0 auto;
}

.tru-hero-visual-text{
  font-size:12px;
  font-weight:800;
  letter-spacing:0.16em;
  text-transform:uppercase;
  color:rgba(15,23,42,0.88);
}
/* Home hero: trust strip spacing */
.tru-hero-trust{
  margin:16px 0 14px;
}
.tru-hero-trust .tm-trust{
  border-radius:16px;
  overflow:hidden;
}

/* HERO trust strip integration (prevents full-width "bar" look) */
.tru-hero-trust{
  margin-top: 14px;
}

.tru-hero-trust .tm-trust{
  background: transparent !important;
  border-bottom: 0 !important;
}

.tru-hero-trust .tm-trust-inner{
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.tru-hero-trust .tm-trust-items{
  justify-content: flex-start !important;
  gap: 12px !important;
}

/* Make plaques slightly tighter inside hero */
.tru-hero-trust .tm-trust-badge{
  width: 52px !important;
  height: 32px !important;
  border-radius: 10px !important;
}

.tru-hero-trust .tm-trust-text{
  font-size: 11px !important;
  letter-spacing: 0.12em !important;
}

.tru-hero-trust .tm-trust-divider{
  height: 18px !important;
  opacity: 0.7 !important;
}

const miniBtn = document.getElementById("truMiniSubmit");

const onMiniClick = () => {
  const name = (document.getElementById("miniName")?.value || "").trim();
  const zip = (document.getElementById("miniZip")?.value || "").trim();
  const size = (document.getElementById("miniSize")?.value || "").trim();

  if (!name || !zip || !size) {
    alert("Please fill out all fields to proceed.");
    return;
  }

  const cta = document.getElementById("truMiniCta");

  // lock button + animate steps
  miniBtn.disabled = true;
  miniBtn.style.opacity = "0.85";
  miniBtn.style.pointerEvents = "none";

  miniBtn.setAttribute("data-step", "0");
  if (cta) cta.textContent = "Building…";

  setTimeout(() => {
    miniBtn.setAttribute("data-step", "1");
    document.querySelectorAll(".tru-hero-form-btn.is-step .step").forEach((el) => el.classList.remove("active"));
    document.querySelector('.tru-hero-form-btn.is-step .step[data-step="1"]')?.classList.add("active");
    if (cta) cta.textContent = "Routing…";
  }, 260);

  setTimeout(() => {
    miniBtn.setAttribute("data-step", "2");
    document.querySelectorAll(".tru-hero-form-btn.is-step .step").forEach((el) => el.classList.remove("active"));
    document.querySelector('.tru-hero-form-btn.is-step .step[data-step="2"]')?.classList.add("active");
    if (cta) cta.textContent = "Pricing…";
  }, 520);

  // route after the “pizza tracker” completes
  setTimeout(() => {
    window.location.href = "/online-estimate";
  }, 780);
};

miniBtn?.addEventListener("click", onMiniClick);


      `}</style>
    </div>
  );
}
