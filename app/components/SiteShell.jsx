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

      <Link className="tm-cta" href="/book-a-consult">
        Book a Consult
      </Link>
    </div>
  </div>
  
      </header>

  {/* TRUST STRIP */}
<div className="tm-trust-strip">
  <div className="tm-trust-inner">
    <div className="tm-trust-item">
      <span className="tm-trust-badge" />
      <span className="tm-trust-text">FMCSA & DOT Compliant</span>
    </div>

    <div className="tm-trust-item">
      <span className="tm-trust-badge" />
      <span className="tm-trust-text">Bonded & Insured</span>
    </div>

    <div className="tm-trust-item">
      <span className="tm-trust-badge" />
      <span className="tm-trust-text">Verified Carrier Network</span>
    </div>
  </div>
</div>

{/* STATUS STRIP */}
<div className="tm-status-strip">
  <div className="tm-status-inner">
    <div className="tm-status-item">
      <span className="tm-status-dot" />
      <span className="tm-status-text">Live Quotes Available</span>
    </div>

    <div className="tm-status-item">
      <span className="tm-status-dot" />
      <span className="tm-status-text">Real Humans, No Spam Calls</span>
    </div>

    <div className="tm-status-item">
      <span className="tm-status-dot" />
      <span className="tm-status-text">Avg Response Under 1 Business Day</span>
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
  .tm-shell{
    min-height:100vh;
    display:flex;
    flex-direction:column;
    background:#fff;
    color:#0f172a;
    font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  }

  /* STATUS STRIP */
  .tm-status-strip{
    border-bottom:1px solid rgba(15,23,42,0.06);
    background:linear-gradient(180deg, rgba(57,255,20,0.10), rgba(255,255,255,0.92));
  }
  .tm-status-inner{
    max-width:1120px;
    margin:0 auto;
    padding:8px 18px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
  }
  .tm-status-group{
    display:flex;
    align-items:center;
    gap:14px;
    flex-wrap:wrap;
    min-width:0;
  }
  .tm-status-item{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:6px 10px;
    border-radius:999px;
    border:1px solid rgba(15,23,42,0.08);
    background:rgba(255,255,255,0.70);
    box-shadow:0 10px 22px rgba(15,23,42,0.06);
    font-size:12px;
    letter-spacing:0.10em;
    text-transform:uppercase;
    font-weight:600;
    white-space:nowrap;
  }
  .tm-status-dot{
    width:10px;
    height:10px;
    border-radius:999px;
    background:
      radial-gradient(circle at 35% 35%,
        #ffffff 0%,
        rgba(255,255,255,0.0) 38%,
        rgba(255,255,255,0.0) 40%),
      radial-gradient(circle at center,
        #39ff14 0%,
        #39ff14 55%,
        rgba(57,255,20,0.25) 56%,
        rgba(57,255,20,0.10) 100%);
    box-shadow:0 0 0 3px rgba(57,255,20,0.14);
    flex:0 0 auto;
  }
  .tm-status-right{
    display:flex;
    align-items:center;
    gap:10px;
    white-space:nowrap;
    color:rgba(15,23,42,0.72);
    font-size:12px;
    letter-spacing:0.04em;
    text-transform:uppercase;
  }
  .tm-status-mini{ font-weight:600; }
  .tm-status-sep{ opacity:0.55; }

  /* HEADER */
  .tm-header{
    position:sticky;
    top:0;
    z-index:50;
    background:rgba(255,255,255,0.92);
    backdrop-filter:blur(10px);
    border-bottom:1px solid #e5e7eb;
  }

  .tm-header-inner{
    max-width:1280px;
    margin:0 auto;
    padding:14px 18px;
    display:grid;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    column-gap:18px;
  }

  .tm-logo{
    display:flex;
    align-items:center;
    flex-shrink:0;
    text-decoration:none;
  }
  .tm-logo-img{
    height:62px;
    width:auto;
    display:block;
    max-width:240px;
  }

/* STATUS STRIP (official badge style) */
.tm-status-strip{
  border-bottom:1px solid rgba(15,23,42,0.10);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.98));
}
.tm-status-inner{
  max-width:1280px;
  margin:0 auto;
  padding:10px 18px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  flex-wrap:wrap;
}
.tm-status-item{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:7px 12px;
  border-radius:12px;              /* not pills */
  background:#ffffff;
  border:1px solid rgba(15,23,42,0.14);
  box-shadow:
    0 10px 22px rgba(15,23,42,0.08),
    inset 0 1px 0 rgba(255,255,255,0.9);
}
.tm-status-dot{
  width:16px;
  height:16px;
  border-radius:6px;
  background:
    linear-gradient(180deg, rgba(57,255,20,0.25), rgba(57,255,20,0.08));
  border:1px solid rgba(57,255,20,0.55);
  box-shadow:0 6px 14px rgba(15,23,42,0.08);
  position:relative;
}
.tm-status-dot:after{
  content:"";
  position:absolute;
  left:5px;
  top:3px;
  width:4px;
  height:7px;
  border-right:2px solid #0f172a;
  border-bottom:2px solid #0f172a;
  transform:rotate(40deg);
  opacity:0.9;
}
.tm-status-text{
  font-size:12px;
  letter-spacing:0.10em;
  text-transform:uppercase;
  font-weight:650;
  color:#0f172a;
  white-space:nowrap;
}


  /* NAV */
  .tm-nav{
    display:flex;
    justify-content:center;
    gap:18px;
    flex-wrap:nowrap;
    white-space:nowrap;
    min-width:0;
  }

  .tm-nav-link{
    position:relative;
    text-decoration:none;
    color:#0f172a;
    font-size:15.5px;
    letter-spacing:0.08em;
    font-weight:500;
    padding:10px 4px;
    white-space:nowrap;
    opacity:0.88;
    transition:opacity 0.15s ease, transform 0.15s ease;
    text-transform:uppercase;
  }
  .tm-nav-link:hover{
    opacity:1;
    transform:translateY(-1px);
  }
  .tm-nav-link::after{
    content:"";
    position:absolute;
    left:4px;
    right:4px;
    bottom:6px;
    height:2px;
    border-radius:2px;
    background:#39ff14;
    transform:scaleX(0);
    transform-origin:left;
    transition:transform 0.18s ease;
  }
  .tm-nav-link:hover::after{ transform:scaleX(1); }
  .tm-nav-link.active{ opacity:1; }
  .tm-nav-link.active::after{ transform:scaleX(1); }

  /* ACTIONS */
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
    padding:0 14px;
    border-radius:999px;
    text-decoration:none;
    white-space:nowrap;
    font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    font-size:12.5px;
    font-weight:600;
    letter-spacing:0.10em;
    text-transform:uppercase;
    color:#0f172a;
    border:1px solid rgba(57,255,20,0.45);
    background:linear-gradient(180deg, rgba(57,255,20,0.18), rgba(57,255,20,0.06));
    box-shadow:0 10px 22px rgba(15,23,42,0.08);
    transition:transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  }

  .tm-call::before,
  .tm-cta::before{
    content:"";
    width:10px;
    height:10px;
    border-radius:999px;
    background:#39ff14;
    box-shadow:0 0 0 4px rgba(57,255,20,0.16);
    flex:0 0 auto;
  }

  .tm-call:hover,
  .tm-cta:hover{
    transform:translateY(-1px);
    box-shadow:0 16px 34px rgba(15,23,42,0.12);
    background:linear-gradient(180deg, rgba(255,255,255,0.92), rgba(57,255,20,0.06));
  }

  /* MAIN + FOOTER */
  .tm-main{ flex:1; width:100%; }

  .tm-footer{
    border-top:1px solid #e5e7eb;
    background:#fff;
  }
  .tm-footer-inner{
    max-width:1120px;
    margin:0 auto;
    padding:24px 18px;
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:16px;
    flex-wrap:wrap;
  }
  .tm-footer-brand{ font-weight:800; color:#000; }
  .tm-footer-sub{ margin-top:6px; color:#6b7280; font-size:13px; max-width:420px; }
  .tm-footer-right{ display:flex; gap:14px; flex-wrap:wrap; }
  .tm-footer-link{ text-decoration:none; color:#111827; font-size:13px; padding:8px 10px; border-radius:10px; }
  .tm-footer-link:hover{ background:#f3f4f6; }

  /* RESPONSIVE FIXES (prevents wrapping and overlap) */
  @media (max-width: 980px){
    .tm-header-inner{
      grid-template-columns:auto 1fr;
      grid-template-rows:auto auto;
      row-gap:10px;
    }
    .tm-header-actions{
      grid-column:2;
      justify-content:flex-end;
    }
    .tm-nav{
      grid-column:1 / -1;
      justify-content:flex-start;
      overflow-x:auto;
      -webkit-overflow-scrolling:touch;
      padding-bottom:6px;
    }
    .tm-nav-link{ font-size:14.5px; }
  }

  @media (max-width: 520px){
    .tm-logo-img{ height:54px; }
    .tm-call, .tm-cta{ height:38px; padding:0 12px; }
    .tm-status-right{ display:none; }
  }

  /* prevent header overlap */
@media (max-width: 1100px){
  .tm-header-inner{
    grid-template-columns:auto 1fr;
    grid-template-rows:auto auto;
    row-gap:10px;
  }
  .tm-nav{
    grid-column:1 / -1;
    justify-content:flex-start;
    overflow-x:auto;
    -webkit-overflow-scrolling:touch;
    padding-bottom:6px;
    scrollbar-width:none;
  }
  .tm-nav::-webkit-scrollbar{display:none;}
  .tm-header-actions{
    grid-column:2;
    justify-content:flex-end;
  }
.tm-trust-strip{
  background:#0f172a;
  color:#ffffff;
  border-bottom:1px solid rgba(255,255,255,0.08);
}
.tm-trust-inner{
  max-width:1280px;
  margin:0 auto;
  padding:10px 18px;
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
  padding:6px 12px;
  border-radius:8px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12);
}
.tm-trust-badge{
  width:16px;
  height:16px;
  border-radius:4px;
  background:
    linear-gradient(180deg,#39ff14,#1fae0b);
  box-shadow:0 0 0 3px rgba(57,255,20,0.25);
}
.tm-trust-text{
  font-size:12px;
  letter-spacing:0.12em;
  text-transform:uppercase;
  font-weight:650;
  white-space:nowrap;
}
.tm-status-strip{
  border-bottom:1px solid rgba(15,23,42,0.10);
  background:linear-gradient(180deg,#ffffff,#f9fafb);
}
.tm-status-inner{
  max-width:1280px;
  margin:0 auto;
  padding:8px 18px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:16px;
  flex-wrap:wrap;
}
.tm-status-item{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:6px 10px;
  border-radius:10px;
  background:#ffffff;
  border:1px solid rgba(15,23,42,0.12);
  box-shadow:0 6px 18px rgba(15,23,42,0.06);
}
.tm-status-dot{
  width:8px;
  height:8px;
  border-radius:999px;
  background:#39ff14;
  box-shadow:0 0 0 3px rgba(57,255,20,0.20);
}
.tm-status-text{
  font-size:11.5px;
  letter-spacing:0.08em;
  text-transform:uppercase;
  font-weight:600;
  color:#0f172a;
  white-space:nowrap;
}

  
}

`}</style>



    </div>
  );
}
