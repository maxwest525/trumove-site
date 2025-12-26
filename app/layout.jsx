import "./globals.css";
import SiteShell from "./components/SiteShell";

export const metadata = {
  title: "TruMove",
  description: "AI-powered moving quotes and carrier coordination.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

import SiteShell from "./components/SiteShell";

export const metadata = {
  title: "TruMove",
  description: "AI-powered moving quotes and carrier coordination.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
