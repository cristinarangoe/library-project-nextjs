import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BookListFavorites from "@/components/Main/BookListFavorites";
import NoSession from "@/components/Main/NoSession";

async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <NoSession />;
  }
  return (
    <div>
      <BookListFavorites />
    </div>
  );
}

export default FavoritesPage;
