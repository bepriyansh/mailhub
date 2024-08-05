import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/custom/sidebar";
import Header from "@/components/custom/header";
import { StoreProvider } from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mailhub",
  description:
    "This Next.js application allows users to send emails to multiple recipients individually, free of charge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <main className="h-screen">
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px]"
              >
                <ResizablePanel defaultSize={23}>
                  <div className="flex h-full items-start justify-start w-full p-6 min-w-72">
                    <Sidebar />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={77}>
                  <div className="min-w-72">
                    <Header />
                    {children}
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </main>
          </StoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
