export const metadata = {
  title: "TruMove",
  description: "AI-powered moving quotes and carrier coordination.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
