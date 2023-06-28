import { ApiAuthor } from "./apiBookDetail";

export interface ApiBookFavorite {
  key: string;
  cover_edition: number[];
  title: string;
  authors: ApiAuthor[];
}
