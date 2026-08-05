export const runtime = "edge";

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

		// @ts-expect-error - EMAIL binding is injected by Cloudflare Workers
		const emailBinding = process.env.EMAIL as {
			send: (options: {
				to: string;
				from: string;
				subject: string;
				html?: string;
				text?: string;
			}) => Promise<{ messageId: string }>;
		};

		const response = await emailBinding.send({
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
