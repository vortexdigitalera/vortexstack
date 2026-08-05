import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	passwordHash: text("password_hash").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	userId: integer("user_id", { mode: "number" })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});

export const notes = sqliteTable("notes", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	userId: integer("user_id", { mode: "number" }).references(() => users.id, {
		onDelete: "cascade",
	}),
	title: text("title").notNull(),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
