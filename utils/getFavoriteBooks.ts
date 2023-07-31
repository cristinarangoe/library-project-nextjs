export async function getData(userEmail: string | null | undefined) {
  const response = await fetch("/api/favorites/getAllFavorites", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userEmail }),
  });
  const data = await response.json();

  return data;
}
