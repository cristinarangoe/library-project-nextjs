import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

function ButtonLogIn() {
  const { data: session } = useSession();
  return (
    <div>
      {!session  ? (
        <Link href="/auth">Iniciar sesión</Link>
      ) : (
        <Link href="/profile">Perfil</Link>
      )}
    </div>
  );
}

export default ButtonLogIn;
