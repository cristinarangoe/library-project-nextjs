import BookList from "@/components/Main/BookList";
import subjectsLists from "@/constants/subjectsList";
import dataTransformation from "@/utils/dataTransformationBookSubject";
import React, { Fragment } from "react";

async function getData(subjectUrl: string, limit: number, offset: number) {
  const res = await fetch(
    `https://openlibrary.org/subjects/${subjectUrl}.json?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function BooksListBySubject({
  params,
}: {
  params: { subjectSlug: string[] };
}) {
  const subjectUrl = params.subjectSlug[0];
  const currentPage = +params.subjectSlug[1];
  const limit = +params.subjectSlug[2];

  const dropdownSubjectSelected = subjectsLists.find(
    (sub) => sub.id === subjectUrl
  );

  const subject = dropdownSubjectSelected ? dropdownSubjectSelected.id : "";

  const offset = currentPage * limit - limit;

  const data = await getData(subject, limit, offset);

  const transformedData = dataTransformation(data);

  return (
    <Fragment>
      <BookList
        books={transformedData}
        url={`/subject/${subject}`}
        totalPages={+Math.ceil(data.work_count / limit)}
        currentPage={currentPage}
        numberOfBooksPerPage={limit}
      />
    </Fragment>
  );
}

export default BooksListBySubject;
