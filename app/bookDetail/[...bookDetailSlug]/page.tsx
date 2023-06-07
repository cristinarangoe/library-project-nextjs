import BookDetailContent from "@/components/Main/BookDetailContent";
import dataTransformation from "@/utils/dataTransformationBookDetail";
import Head from "next/head";
import React, { Fragment } from "react";

async function getData(bookApi: string, bookId: string) {
  const res = await fetch(`https://openlibrary.org/${bookApi}/${bookId}.json`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function BookDetail({ params }: { params: { bookDetailSlug: string } }) {
  const bookApi = params.bookDetailSlug[0];
  const bookId = params.bookDetailSlug[1];

  const data = await getData(bookApi, bookId);
  const transformedData = await dataTransformation(data);

  if (!transformedData) {
    return <div>No se ha encontrado información acerca de este libro</div>;
  }
  return (
    <Fragment>
      <Head>
        <title>{`Libro ${transformedData.title}`}</title>
        <meta
          name="description"
          content={`Libro ${transformedData.title}`}
        ></meta>
      </Head>
      <BookDetailContent book={transformedData} />
    </Fragment>
  );
}

export default BookDetail;
