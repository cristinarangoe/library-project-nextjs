import { ApiAuthor, ApiBook } from "../models/apiBookDetail";

const dataTransformation = async (data: ApiBook) => {
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

  const date = new Date(data.created.value);

  const transformedBook = {
    id: data.key,
    coverUrl:
      data.covers &&
      `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`,
    description:
      data.description ?  (typeof data.description === "string"
        ? data.description
        : data.description.value) : "" ,
    authors: authors ? authors.join(", ") : "",
    title: data.title,
    subjects: data.subjects,
    dateCreated: `${date.getDate().toString()}/${date
      .getMonth()
      .toString()}/${date.getFullYear().toString()}`,
    publishDate: data.first_publish_date,
  };

  return transformedBook;
};

export default dataTransformation;
