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

  .tm-header{
    position:sticky;
    top:0;
    z-index:50;
    background:rgba(255,255,255,0.92);
    backdrop-filter:blur(10px);
    border-bottom:1px solid #e5e7eb;
  }

  .tm-header-inner{
    max-width:1120px;
    margin:0 auto;
     padding: 16px 20px;
    display:flex;
    align-items:center;
    gap:14px;
  }

  .tm-logo{display:flex;align-items:center;flex:0 0 auto}
  .tm-logo-img{height:62px;width:auto;display:block}

  .tm-nav{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:18px;
    flex:1 1 auto;
    min-width:0;
  }

  /* clean Godaddy-style links (NOT pills) */
  .tm-nav-link{
    position:relative;
    text-decoration:none;
    color:#0f172a;
    font-size:15.5px;
    letter-spacing:0.06em;
    font-weight:500;
    padding:10px 4px;
    white-space:nowrap;
    opacity:.9;
    transition:opacity .15s ease, transform .15s ease;
    text-transform:uppercase;
  }
  .tm-nav-link:hover{opacity:1;transform:translateY(-1px)}
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
    transition:transform .18s ease;
  }
  .tm-nav-link:hover::after{transform:scaleX(1)}
  .tm-nav-link.active{opacity:1}
  .tm-nav-link.active::after{transform:scaleX(1)}

  .tm-header-actions{
    display:flex;
    align-items:center;
    gap:10px;
    flex:0 0 auto;
  }

  /* nicer pills */
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

  font-size:14px;
  font-weight:600;
  letter-spacing:0.06em;
  text-transform:uppercase;

  color:#0f172a;
  background:linear-gradient(180deg, rgba(57,255,20,0.22), rgba(57,255,20,0.08));
  border-color:rgba(57,255,20,0.45);
  box-shadow:0 10px 22px rgba(15,23,42,0.08);

  transition:transform .15s ease, box-shadow .15s ease, background .15s ease, border-color .15s ease;
}

.tm-call::before,
.tm-cta::before{
  content:"";
  width:10px;
  height:10px;
  border-radius:999px;
  background:#39ff14;
  box-shadow:0 0 0 4px rgba(57,255,20,0.14);
}

.tm-call:hover,
.tm-cta:hover{
  transform:translateY(-1px);
  box-shadow:0 16px 34px rgba(15,23,42,0.12);
  border-color:rgba(57,255,20,0.35);
  background:rgba(255,255,255,0.92);
}



  .tm-main{flex:1;width:100%}

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
  .tm-footer-brand{font-weight:800;color:#000}
  .tm-footer-sub{margin-top:6px;color:#6b7280;font-size:13px;max-width:420px}
  .tm-footer-right{display:flex;gap:14px;flex-wrap:wrap}
  .tm-footer-link{text-decoration:none;color:#111827;font-size:13px;padding:8px 10px;border-radius:10px}
  .tm-footer-link:hover{background:#f3f4f6}
`}</style>
    </div>
  );
}
