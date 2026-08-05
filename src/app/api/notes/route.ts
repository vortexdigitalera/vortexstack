import { createDb } from "@/db";
import { notes } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const { env } = getCloudflareContext();
		const db = createDb(env.DB);
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

		const { env } = getCloudflareContext();
		const db = createDb(env.DB);
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
