import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-foreground">
			<main className="flex max-w-2xl flex-col items-center gap-8 text-center">
				<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
					Welcome to VortexStack
				</h1>
				<p className="text-lg text-muted-foreground sm:text-xl">
					A modern full-stack starter built with Next.js, Tailwind CSS,
					and shadcn/ui — ready for Cloudflare Workers.
				</p>

				<div className="flex flex-col gap-4 sm:flex-row">
					<Link
						href="/contact"
						className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
					>
						Contact us
						<ArrowRight className="ml-1 h-4 w-4" />
					</Link>
					<a
						href="https://nextjs.org/docs"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
					>
						Read Next.js docs
					</a>
				</div>
			</main>
		</div>
	);
}
