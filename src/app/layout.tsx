import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The 2027 RP Journey at a Glance | IT4010 Research Project",
  description: "Interactive Bumblebee-themed timeline and milestone tracker for the 2027 Research Project journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Neutralize extension attributes before React hydrates
              (function() {
                var observer = new MutationObserver(function(mutations) {
                  for (var i = 0; i < mutations.length; i++) {
                    var m = mutations[i];
                    if (m.type === 'attributes' && m.attributeName && (m.attributeName.indexOf('bis_') === 0 || m.attributeName.indexOf('data-lt-') === 0)) {
                      m.target.removeAttribute(m.attributeName);
                    }
                  }
                });
                observer.observe(document.documentElement, { attributes: true, subtree: true });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0f0e0c] text-neutral-100" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
