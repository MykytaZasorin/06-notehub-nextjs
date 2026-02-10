"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";

const PER_PAGE = 12;

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data, isLoading, isFetching, isError } = useQuery<FetchNotesResponse>(
    {
      queryKey: ["notes", page, search],
      queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
      placeholderData: () =>
        queryClient.getQueryData<FetchNotesResponse>([
          "notes",
          page - 1,
          search,
        ]),
    },
  );

  return (
    <div>
      <header>
        <SearchBox onChange={debouncedSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
