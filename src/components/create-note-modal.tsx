"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateNoteModal({ onCreated }: { onCreated?: () => void }) {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch("/api/notes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, content }),
			});

			const data = (await response.json()) as { error?: string };

			if (!response.ok) {
				throw new Error(data.error || "Failed to create note");
			}

			setTitle("");
			setContent("");
			setOpen(false);
			onCreated?.();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					New note
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create note</DialogTitle>
						<DialogDescription>
							Add a new note to your collection. Click save when
							done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Note title"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="content">Content</Label>
							<Textarea
								id="content"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								placeholder="Write your note here..."
								rows={4}
								required
							/>
						</div>
						{error && (
							<p className="text-sm text-destructive">{error}</p>
						)}
					</div>
					<DialogFooter>
						<Button type="submit" disabled={loading}>
							{loading ? "Saving..." : "Save note"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
