"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/online-estimate", label: "Get an Estimate" },
  { href: "/book", label: "Book a Consult" },
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
<Link href="/" className="tm-logo">
  <img src="/logo.png" alt="TruMove" />
</Link>


          <nav className="tm-nav">
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

<Link className="tm-cta" href="/book" aria-label="Book a consult">
  <span className="tm-cta-icon" aria-hidden="true">☎</span>
  <span className="tm-cta-text">Call Us Now</span>
</Link>
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

      <style jsx>{`
        .tm-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fff;
          color: #0f172a;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
        }
        .tm-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e7eb;
        }
        .tm-header-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .tm-logo {
          font-weight: 800;
          letter-spacing: -0.02em;
          text-decoration: none;
          color: #000;
          font-size: 18px;
          margin-right: 6px;
        }
        .tm-nav {
          display: flex;
          gap: 12px;
          flex: 1;
          align-items: center;
          flex-wrap: wrap;
        }
        .tm-nav-link {
          text-decoration: none;
          color: #111827;
          font-size: 14px;
          padding: 8px 10px;
          border-radius: 10px;
        }
        .tm-nav-link:hover {
          background: #f3f4f6;
        }
        .tm-nav-link.active {
          background: #111827;
          color: #fff;
        }
.tm-cta{
  text-decoration:none;
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 14px 10px 10px;
  border-radius:999px;
  background:#39ff14;
  color:#000;
  border:1px solid #16a34a33;
  font-weight:900;
  letter-spacing:0.12em;
  font-size:12px;
  white-space:nowrap;
}
.tm-cta:hover{ filter:brightness(0.96); }

.tm-cta-icon{
  width:28px;
  height:28px;
  border-radius:999px;
  background:#fff;
  border:1px solid rgba(0,0,0,0.12);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  line-height:1;
}
.tm-cta-text{
  position:relative;
  top:1px;
}

        .tm-main {
          flex: 1;
          width: 100%;
        }
        .tm-footer {
          border-top: 1px solid #e5e7eb;
          background: #fff;
        }
        .tm-footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 24px 18px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .tm-footer-brand {
          font-weight: 800;
          color: #000;
        }
        .tm-footer-sub {
          margin-top: 6px;
          color: #6b7280;
          font-size: 13px;
          max-width: 420px;
        }
        .tm-footer-right {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tm-footer-link {
          text-decoration: none;
          color: #111827;
          font-size: 13px;
          padding: 8px 10px;
          border-radius: 10px;
        }
        .tm-footer-link:hover {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
}
