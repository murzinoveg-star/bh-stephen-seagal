import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "БФ Стивена Сигала — помогаем там, где нужна поддержка",
  description:
    "Помогаем участникам СВО — юридической и психологической поддержкой, детям, животным и старшим.",
  metadataBase: new URL("https://example.org"),
  openGraph: {
    title: "БФ Стивена Сигала",
    description:
      "Помогаем там, где нужна поддержка: участникам СВО, детям, животным и старшим.",
    locale: "ru_RU",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
