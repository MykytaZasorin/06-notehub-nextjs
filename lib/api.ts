import axios from "axios";
import { Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(params: {
  page: number;
  perPage: number;
  search?: string;
}): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
}

export async function createNote(params: CreateNoteParams): Promise<Note> {
  const { data } = await axios.post<Note>(`${BASE_URL}/notes`, params, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
}
