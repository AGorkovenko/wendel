import "@fontsource-variable/instrument-sans";
import "./globals.css";

export const metadata = {
  title: "Spargel & Obsthof Wendel",
  description: "Spargel, Erdbeeren und Himbeeren von der Bergstraße.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
