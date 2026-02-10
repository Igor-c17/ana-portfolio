import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/DarkModeToggle";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { FloatingDock } from "@/components/FloatingDock";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
	title: "Portfolio Ana Alexandria",
	description: "Portfolio Ana Alexandria",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="pt-BR" suppressHydrationWarning>
				<head>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
					/>
				</head>

				<body className="antialiased" suppressHydrationWarning>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider defaultOpen={false}>
							<SidebarInset>{children}</SidebarInset>

							<AppSidebar side="right" />

							<FloatingDock />

							{/* Chat IA */}
							{/*<SidebarToggle/>*/}

							{/* Mode Toggle - Desktop: bottom right next to AI chat, Mobile: top right next to burger menu */}
							<div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-0">
								<div className="w-10 h-10 md:w-12 md:h-12">
									<ModeToggle />
								</div>
							</div>
						</SidebarProvider>

						<SanityLive />

						{(await draftMode()).isEnabled && (
							<>
								<VisualEditing />
								<DisableDraftMode />
							</>
						)}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
