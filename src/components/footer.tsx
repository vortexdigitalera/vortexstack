import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t bg-background py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<div className="text-center md:text-left">
						<Link href="/" className="text-lg font-bold">
							VortexStack
						</Link>
						<p className="text-sm text-muted-foreground">
							Built for Cloudflare Workers.
						</p>
					</div>

					<nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
						<Link href="/" className="hover:text-foreground">
							Home
						</Link>
						<Link href="/contact" className="hover:text-foreground">
							Contact
						</Link>
						<Link href="/notes" className="hover:text-foreground">
							Notes
						</Link>
						<Link href="/dashboard" className="hover:text-foreground">
							Dashboard
						</Link>
					</nav>

					<p className="text-sm text-muted-foreground">
						© {currentYear} VortexStack. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
