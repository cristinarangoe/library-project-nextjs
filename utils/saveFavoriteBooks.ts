type DBBook = {
  bookId: string | null | undefined;
  name: string;
  userEmail?: string;
};
export async function saveFavoriteBook(book: DBBook) {
  const bookId = book.bookId;
  const name = book.name;
  const userEmail = book.userEmail;

  const response = await fetch("/api/favorites/saveFavorites", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ bookId, name, userEmail }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
