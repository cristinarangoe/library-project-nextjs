import BookList from "@/components/Main/BookList";
import optionsDropdown from "@/constants/searchBarDropdownOptions";
import DropdownOption from "@/models/searchBarDropdownOption";
import dataTransformation from "@/utils/dataTransformationBookSearch";
import React, { Fragment } from "react";

async function getData(
  searchType: string,
  convertedParams: string,
  limit: number,
  offset: number
) {
  const res = await fetch(
    `https://openlibrary.org/search.json?${searchType}=${convertedParams}&limit=${limit}&offset=${offset}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function BooksListBySearch({
  params,
}: {
  params: { searchSlug: string[] };
}) {
  const searchType = params.searchSlug[0];
  const searchField = params.searchSlug[1];
  const currentPage = +params.searchSlug[2];
  const limit = +params.searchSlug[3];
  const offset = currentPage * limit - limit;

  const dropdownOptionSelected = optionsDropdown.find(
    (opt: DropdownOption) => opt.id === searchType
  );
  const typeOfSearch = dropdownOptionSelected
    ? dropdownOptionSelected.name
    : "";

  const convertedParams = searchField ? searchField.replace(/\s/g, "+") : "";

  const data = await getData(searchType, convertedParams, limit, offset);
  const transformedData = dataTransformation(data);

  return (
    <Fragment>
      <BookList
        books={transformedData}
        url={`/search/${searchType}/${searchField}`}
        totalPages={+Math.ceil(data.numFound / limit)}
        currentPage={currentPage}
        numberOfBooksPerPage={limit}
      />
    </Fragment>
  );
}

export default BooksListBySearch;
