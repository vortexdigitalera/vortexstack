import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Contact Us",
	description: "Get in touch with us through our contact page.",
};

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-background">
			<header className="border-b">
				<div className="container mx-auto flex h-16 items-center px-4">
					<Link href="/" className="font-semibold text-lg">
						VortexStack
					</Link>
				</div>
			</header>

			<main className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-2xl text-center mb-12">
					<h1 className="text-4xl font-bold tracking-tight mb-4">
						Contact Us
					</h1>
					<p className="text-lg text-muted-foreground">
						Have a question or want to work together? Fill out the form
						below and we&apos;ll get back to you as soon as possible.
					</p>
				</div>

				<div className="mx-auto max-w-xl">
					<Card>
						<CardHeader>
							<CardTitle>Send a message</CardTitle>
							<CardDescription>
								We&apos;ll respond within 1-2 business days.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										name="name"
										placeholder="Your name"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="you@example.com"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										name="message"
										placeholder="How can we help?"
										rows={5}
										required
									/>
								</div>
								<Button type="submit" className="w-full">
									Send message
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				<div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-3 text-center">
					<div className="space-y-2">
						<Mail className="mx-auto h-6 w-6 text-muted-foreground" />
						<h3 className="font-medium">Email</h3>
						<p className="text-sm text-muted-foreground">
							hello@vortexstack.dev
						</p>
					</div>
					<div className="space-y-2">
						<Phone className="mx-auto h-6 w-6 text-muted-foreground" />
						<h3 className="font-medium">Phone</h3>
						<p className="text-sm text-muted-foreground">
							+1 (555) 123-4567
						</p>
					</div>
					<div className="space-y-2">
						<MapPin className="mx-auto h-6 w-6 text-muted-foreground" />
						<h3 className="font-medium">Office</h3>
						<p className="text-sm text-muted-foreground">
							San Francisco, CA
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
