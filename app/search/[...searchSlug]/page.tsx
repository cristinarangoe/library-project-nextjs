"use client";
import BookList from "@/components/Main/BookList";
import { ApiData } from "@/models/apiBookSearch";
import Book from "@/models/book";
import DropdownOption from "@/models/searchBarDropdownOption";
import { RootState } from "@/store";
import { paginationActions } from "@/store/pagination";
import dataTransformation from "@/utils/dataTransformationBookSearch";
import optionsDropdown from "@/constants/searchBarDropdownOptions";
import useFetch from "@/utils/useFetch";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BookListBySearch({ params }: { params: { searchSlug: string[] } }) {
  const [books, setBooks] = useState<Book[]>([]);

  const dispatch = useDispatch();

  const searchType = params.searchSlug[0];
  const searchField = params.searchSlug[1];

  const offset = useSelector((state: RootState) => state.pagination.offset);
  const limit = useSelector((state: RootState) => state.pagination.limit);

  const dropdownOptionSelected = optionsDropdown.find(
    (opt: DropdownOption) => opt.id === searchType
  );
  const typeOfSearch = dropdownOptionSelected
    ? dropdownOptionSelected.name
    : "";

  const convertedParams = searchField ? searchField.replace(/\s/g, "+") : "";

  const { data, error } = useFetch<ApiData>(
    `https://openlibrary.org/search.json?${searchType}=${convertedParams}&limit=${limit}&offset=${offset}`
  );

  const getTranformatedData = async () => {
    if (!data) return;
    const transformedBooks: Book[] = await dataTransformation(data);
    transformedBooks && setBooks(transformedBooks);
    dispatch(paginationActions.setTotalPages(Math.ceil(data.numFound / limit)));
  };

  useEffect(() => {
    getTranformatedData();
  }, [data]);

  return (
    <Fragment>
      <Head>
        <title>
          {typeOfSearch} de {convertedParams}
        </title>
        <meta name="" content=""></meta>
      </Head>
      <BookList error={error} books={books} />
    </Fragment>
  );
}

export default BookListBySearch;
