"use client";
import BookList from "@/components/Main/BookList";
import { ApiData } from "@/models/apiBookSubject";
import Book from "@/models/book";
import { RootState } from "@/store";
import { paginationActions } from "@/store/pagination";
import dataTransformation from "@/utils/dataTransformationBookSubject";
import subjectsLists from "@/constants/subjectsList";
import useFetch from "@/utils/useFetch";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BooksListBySubject({ params }: { params: { subjectId: string } }) {
  const [books, setBooks] = useState<Book[]>([]);

  const dispatch = useDispatch();

  const subjectUrl = params.subjectId;

  const offset = useSelector((state: RootState) => state.pagination.offset);
  const limit = useSelector((state: RootState) => state.pagination.limit);

  const dropdownSubjectSelected = subjectsLists.find(
    (sub) => sub.id === subjectUrl
  );
  const subject = dropdownSubjectSelected ? dropdownSubjectSelected.name : "";

  const { data, error } = useFetch<ApiData>(
    `https://openlibrary.org/subjects/${subjectUrl}.json?limit=${limit}&offset=${offset}`
  );

  const getTranformatedData = async () => {
    if (!data) return;
    const transformedBooks: Book[] = await dataTransformation(data);
    transformedBooks && setBooks(transformedBooks);
    dispatch(
      paginationActions.setTotalPages(+Math.ceil(data.work_count / limit))
    );
  };
  useEffect(() => {
    getTranformatedData();
  }, [data]);

  return (
    <Fragment>
      <Head>
        <title>Libros de {subject}</title>
        <meta name="description" content="Find a lot of things"></meta>
      </Head>
      <BookList error={error} books={books} />
    </Fragment>
  );
}

export default BooksListBySubject;
