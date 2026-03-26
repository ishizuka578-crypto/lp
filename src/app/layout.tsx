import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "小規模企業向け採用代行 | Possidless",
  description:
    "10〜50名規模の企業向けに、スカウト運用を中心とした採用代行を提供。採用設計、応募導線改善、実務代行まで対応します。",
  metadataBase: new URL("https://lp.possidless.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "小規模企業向け採用代行 | Possidless",
    description:
      "採用が止まる原因を整理し、スカウト運用から応募導線改善、実務代行まで支援します。",
    url: "https://lp.possidless.com",
    siteName: "Possidless Recruit Support",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-96DYCPH322"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-96DYCPH322');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
