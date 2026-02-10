"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface NoteDetailsProps {
  noteId: string;
  initialData?: Note;
}

export default function NoteDetailsClient({
  noteId,
  initialData,
}: NoteDetailsProps) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    initialData,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className="note-container">
      <h2>{note.title}</h2>
      <p>{note.tag}</p>
      <p>{note.content}</p>
      <p>{new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}
