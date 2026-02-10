"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

interface Props {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.tag}</p>
      <p>{note.content}</p>
      <p>{new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}
