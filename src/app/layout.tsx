"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/adminx");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SEO Meta Tags */}
        <title>EcoTrustia Solutions | AI, Web3 & High-Performance Digital Agency</title>
        <meta name="description" content="EcoTrustia is a premier digital agency specializing in AI development, Web3 solutions, mobile app engineering, and automation services. Architecting high-scale digital ecosystems." />
        <meta name="keywords" content="AI development, Web3 solutions, Web and mobile development, Automation services, Ecotrustia, AI agency UAE, blockchain development" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="EcoTrustia Solutions | Engineering the Digital Future" />
        <meta property="og:description" content="Advanced AI, Web3, and Full-Stack development for visionary brands." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '508677432337059');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=508677432337059&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {!isAdminPage && <Header />}
        <main>
          {children}
        </main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
