import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
	variable: "--font-bricolage",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "VortexStack",
	description: "A modern full-stack web application built with Next.js.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${bricolage.variable} font-sans antialiased`}>
				{children}
			</body>
		</html>
	);
}
