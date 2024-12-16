import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workspace App",
  description: "Your personal workspace for notes, todos, projects, and reminders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
