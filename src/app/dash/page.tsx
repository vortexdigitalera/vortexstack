import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCloudflareAccessUser } from "@/lib/cloudflare-access";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function DashPage() {
	const requestHeaders = await headers();
	const user = getCloudflareAccessUser(requestHeaders);

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back, {user.email}
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Account</CardTitle>
						<CardDescription>Your authenticated account details</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<p className="text-sm">
							<strong>Email:</strong> {user.email}
						</p>
						<p className="text-sm">
							<strong>User ID:</strong> {user.userId}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Status</CardTitle>
						<CardDescription>Authentication status</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-green-600">Authenticated via Cloudflare Access</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
