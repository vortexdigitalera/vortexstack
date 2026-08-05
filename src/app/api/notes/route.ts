import { createDb } from "@/db";
import { notes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
	try {
		// @ts-expect-error - DB binding is injected by Cloudflare Workers
		const db = createDb(process.env.DB as D1Database);
		const allNotes = await db.query.notes.findMany({
			orderBy: desc(notes.createdAt),
			limit: 20,
		});

		return Response.json({ notes: allNotes });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return Response.json({ error: message }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { title, content, userId } = (await request.json()) as {
			title: string;
			content: string;
			userId?: number;
		};

		if (!title || !content) {
			return Response.json(
				{ error: "Title and content are required" },
				{ status: 400 }
			);
		}

		// @ts-expect-error - DB binding is injected by Cloudflare Workers
		const db = createDb(process.env.DB as D1Database);
		const result = await db
			.insert(notes)
			.values({
				title,
				content,
				userId: userId || null,
			})
			.returning();

		return Response.json({ note: result[0] });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return Response.json({ error: message }, { status: 500 });
	}
}
