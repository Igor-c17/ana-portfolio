import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Portfolio Ana Alexandria Studio",
	description: "Portfolio Ana Alexandria Studio",
};

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}

export default Layout;
