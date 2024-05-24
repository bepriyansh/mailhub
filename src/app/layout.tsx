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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "maiLkaro",
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
          <main className="h-screen">
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-[200px]"
            >
              <ResizablePanel defaultSize={20}>
                <Sidebar />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
            </ResizablePanelGroup>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
