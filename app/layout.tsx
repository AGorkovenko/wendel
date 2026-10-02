import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/newsreader";
import "./globals.css";

export const metadata = {
  title: "Spargel & Obsthof Wendel | Gutes wächst ganz nah",
  description:
    "Spargel, Erdbeeren und Himbeeren aus eigenem Anbau in Zwingenberg. Entdecken Sie Familie Wendel, unseren Hofladen, das Hof-Café und Selbstpflücken an der Bergstraße.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
