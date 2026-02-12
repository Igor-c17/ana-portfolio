import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { draftMode } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/DarkModeToggle";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { FloatingDock } from "@/components/FloatingDock";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DraftToolsClient } from "@/components/DraftTools.client";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Portfolio Ana Alexandria",
  description: "Portfolio Ana Alexandria",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
        <body className="antialiased" suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider defaultOpen={false}>
              <SidebarInset>{children}</SidebarInset>

              <AppSidebar side="right" />
              <FloatingDock />

              <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-0">
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <ModeToggle />
                </div>
              </div>
            </SidebarProvider>

            {isDraft && (
              <>
                <DraftToolsClient />
                <DisableDraftMode />
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
