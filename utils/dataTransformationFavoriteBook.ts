import { ApiBookFavorite } from "@/models/apiBookFavorite";
import { ApiAuthor } from "@/models/apiBookDetail";

const dataTransformation = async (data: ApiBookFavorite) => {
  if (!data) return;
  const authors = await Promise.all(
    data.authors.map(async (aut: ApiAuthor) => {
      const response = await fetch(
        `https://openlibrary.org${aut.author.key}.json`
      );
      const author = await response.json();
      return await author.name;
    })
  );
  return {
    id: data.key,
    coverUrl:
      data.cover_edition &&
      `https://covers.openlibrary.org/b/olid/${data.cover_edition}-L.jpg`,
    title: data.title,
    authors: authors ? authors.join(", ") : "",
  };
};

export default dataTransformation;
