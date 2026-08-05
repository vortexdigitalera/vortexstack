import { createDb } from "@/db";
import { createUser } from "@/lib/auth";

export const runtime = "edge";

export async function POST(request: Request) {
	try {
		const { email, name, password } = (await request.json()) as {
			email: string;
			name: string;
			password: string;
		};

		if (!email || !name || !password) {
			return Response.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// @ts-expect-error - DB binding is injected by Cloudflare Workers
		const db = createDb(process.env.DB as D1Database);
		const user = await createUser(db, { email, name, password });

		return Response.json({ user: { id: user.id, email: user.email, name: user.name } });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return Response.json({ error: message }, { status: 400 });
	}
}
