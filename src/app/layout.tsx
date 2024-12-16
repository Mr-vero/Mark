import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./components/ThemeProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workspace App",
  description: "A modern workspace application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
