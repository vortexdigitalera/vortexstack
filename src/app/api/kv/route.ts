export const runtime = "edge";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const key = searchParams.get("key");

		if (!key) {
			return Response.json({ error: "Missing key" }, { status: 400 });
		}

		// @ts-expect-error - KV binding is injected by Cloudflare Workers
		const kv = process.env.KV as KVNamespace;
		const value = await kv.get(key);

		return Response.json({ key, value });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return Response.json({ error: message }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { key, value, ttl } = (await request.json()) as {
			key: string;
			value: string;
			ttl?: number;
		};

		if (!key || value === undefined) {
			return Response.json(
				{ error: "Missing required fields: key, value" },
				{ status: 400 }
			);
		}

		// @ts-expect-error - KV binding is injected by Cloudflare Workers
		const kv = process.env.KV as KVNamespace;

		if (ttl) {
			await kv.put(key, value, { expirationTtl: ttl });
		} else {
			await kv.put(key, value);
		}

		return Response.json({ success: true, key });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return Response.json({ error: message }, { status: 500 });
	}
}
