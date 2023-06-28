"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Hubo un error!</h2>
      <button onClick={() => reset()}>Vuelve a intentarlo!</button>
      <h3>O retorna a la página <Link href="/">principal</Link></h3>
    </div>
  );
}
