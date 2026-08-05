"use client";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/contact", label: "Contact" },
	{ href: "/notes", label: "Notes" },
	{ href: "/dashboard", label: "Dashboard" },
];

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link href="/" className="text-xl font-bold">
					VortexStack
				</Link>

				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>
						{navLinks.map((link) => (
							<NavigationMenuItem key={link.href}>
								<NavigationMenuLink
									href={link.href}
									className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
								>
									{link.label}
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				<div className="hidden items-center gap-2 md:flex">
					<a
						href="/login"
						className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						Login
					</a>
					<a
						href="/signup"
						className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						Sign up
					</a>
				</div>

				<button
					type="button"
					className="inline-flex h-9 w-9 items-center justify-center rounded-md md:hidden"
					onClick={() => setMobileOpen(!mobileOpen)}
				>
					{mobileOpen ? (
						<X className="h-5 w-5" />
					) : (
						<Menu className="h-5 w-5" />
					)}
				</button>
			</div>

			{mobileOpen && (
				<div className="border-t bg-background px-4 py-4 md:hidden">
					<nav className="flex flex-col gap-4">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-sm font-medium transition-colors hover:text-primary"
								onClick={() => setMobileOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<div className="flex flex-col gap-2 pt-2">
							<a
								href="/login"
								className="inline-flex h-9 w-full items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
							>
								Login
							</a>
							<a
								href="/signup"
								className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
							>
								Sign up
							</a>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
