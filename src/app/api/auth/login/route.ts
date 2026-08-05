import { createDb } from "@/db";
import { validateCredentials } from "@/lib/auth";

export const runtime = "edge";

export async function POST(request: Request) {
	try {
		const { email, password } = (await request.json()) as {
			email: string;
			password: string;
		};

		if (!email || !password) {
			return Response.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// @ts-expect-error - DB binding is injected by Cloudflare Workers
		const db = createDb(process.env.DB as D1Database);
		const user = await validateCredentials(db, { email, password });

		if (!user) {
			return Response.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		return Response.json({ user: { id: user.id, email: user.email, name: user.name } });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return Response.json({ error: message }, { status: 500 });
	}
}
