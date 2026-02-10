import { QueryClient, dehydrate, Hydrate } from "@tanstack/react-query";
import NoteDetailsClient from "@/components/NoteDetails/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={params.id} />
    </Hydrate>
  );
}
