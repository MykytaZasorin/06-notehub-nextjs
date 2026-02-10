"use client";

import Link from "next/link";

export default function NoteDetailsError() {
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <p>We couldn’t load the note details.</p>
      <Link href="/notes">Go back to Notes</Link>
    </div>
  );
}
