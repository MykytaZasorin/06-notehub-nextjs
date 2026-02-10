import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  // Отримуємо нотатку на сервері
  const note: Note = await fetchNoteById(params.id);

  // Передаємо у клієнтський компонент як initialData
  return <NoteDetailsClient noteId={params.id} initialData={note} />;
}
