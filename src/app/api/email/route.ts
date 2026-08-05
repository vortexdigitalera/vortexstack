import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	try {
		const { to, subject, html, text } = (await request.json()) as {
			to: string;
			subject: string;
			html?: string;
			text?: string;
		};

		if (!to || !subject) {
			return Response.json(
				{ error: "Missing required fields: to, subject" },
				{ status: 400 }
			);
		}

		const { env } = getCloudflareContext();
		const response = await env.EMAIL.send({
			to,
			from: "welcome@vortex.name.ng",
			subject,
			html: html || `<p>${text || subject}</p>`,
			text: text || subject,
		});

		return Response.json({ messageId: response.messageId });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return Response.json({ error: message }, { status: 500 });
	}
}
