"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
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
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
