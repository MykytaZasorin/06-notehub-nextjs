import { QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface Params {
  id: string | string[];
}

export default async function NoteDetailsPage({ params }: { params: Params }) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const initialData = queryClient.getQueryData<Note>(["note", id]);

  return <NoteDetailsClient noteId={id} initialData={initialData} />;
}
