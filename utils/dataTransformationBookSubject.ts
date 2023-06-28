import { ApiBook, ApiData, Author } from "../models/apiBookSubject";
import Book from "../models/book";

const dataTransformation = (data: ApiData) => {
  const transformedBooks: Book[] = data.works.map((book: ApiBook) => {
    return {
      id: book.key,
      coverUrl:
        book.cover_edition_key &&
        `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`,
      title: book.title,
      authors: book.authors.map((author: Author) => author.name).join(", "),
    };
  });

  return transformedBooks;
};

export default dataTransformation;
