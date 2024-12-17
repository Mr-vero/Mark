import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./components/ThemeProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workspace App",
  description: "A modern workspace application",
  manifest: "/manifest.json",
  themeColor: "#1F2937",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Workspace",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Workspace" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${geist.className} antialiased`}>
        <AppProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
