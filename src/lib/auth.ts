import { createDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(
	password: string,
	hash: string
): Promise<boolean> {
	const hashed = await hashPassword(password);
	return hashed === hash;
}

export async function createUser(
	db: ReturnType<typeof createDb>,
	data: { email: string; name: string; password: string }
) {
	const existing = await db.query.users.findFirst({
		where: eq(users.email, data.email),
	});

	if (existing) {
		throw new Error("User already exists");
	}

	const passwordHash = await hashPassword(data.password);

	const result = await db
		.insert(users)
		.values({
			email: data.email,
			name: data.name,
			passwordHash,
		})
		.returning();

	return result[0];
}

export async function validateCredentials(
	db: ReturnType<typeof createDb>,
	data: { email: string; password: string }
) {
	const user = await db.query.users.findFirst({
		where: eq(users.email, data.email),
	});

	if (!user) {
		return null;
	}

	const valid = await verifyPassword(data.password, user.passwordHash);

	if (!valid) {
		return null;
	}

	return user;
}
