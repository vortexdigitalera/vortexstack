"use client";

import { CreateNoteModal } from "@/components/create-note-modal";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

type Note = {
	id: number;
	title: string;
	content: string;
	createdAt: string | number | Date;
};

export default function NotesPage() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	async function fetchNotes() {
		try {
			setLoading(true);
			const response = await fetch("/api/notes");
			const data = (await response.json()) as {
				error?: string;
				notes: Note[];
			};

			if (!response.ok) {
				throw new Error(data.error || "Failed to fetch notes");
			}

			setNotes(data.notes);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchNotes();
	}, []);

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Notes</h1>
					<p className="text-muted-foreground">
						Manage your notes stored in D1.
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={fetchNotes}>
						Refresh
					</Button>
					<CreateNoteModal onCreated={fetchNotes} />
				</div>
			</div>

			{loading && <p className="text-muted-foreground">Loading notes...</p>}
			{error && <p className="text-destructive">{error}</p>}

			{!loading && notes.length === 0 && !error && (
				<p className="text-muted-foreground">
					No notes yet. Create your first note with the button above.
				</p>
			)}

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{notes.map((note) => (
					<Card key={note.id}>
						<CardHeader>
							<CardTitle>{note.title}</CardTitle>
							<CardDescription>
								{new Date(note.createdAt).toLocaleDateString()}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								{note.content}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
