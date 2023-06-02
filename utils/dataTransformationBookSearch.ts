import { ApiBook, ApiData } from "../models/apiBookSearch";
import Book from "../models/book";

const dataTransformation = async (data: ApiData) => {
  const transformedBooks: Book[] = data.docs.map((book: ApiBook) => {
    return {
      id: book.key,
      coverUrl:
        book.cover_edition_key &&
        `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`,
      title: book.title,
      authors: book.author_name.join(", "),
    };
  });

  return transformedBooks;
};

export default dataTransformation;
