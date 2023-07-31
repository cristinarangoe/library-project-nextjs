import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Página no encontrada</h2>
      <p>No se encontró página con la URL pedida</p>
      <p>
        Retorna a la página<Link href="/">Principal</Link>
      </p>
    </div>
  );
}
