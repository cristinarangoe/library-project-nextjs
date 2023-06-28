import { connectToDatabase } from "@/lib/db";
import dataTransformation from "@/utils/dataTransformationFavoriteBook";
import { NextResponse } from "next/server";

async function getData(bookApi: string, bookId: string) {
  const res = await fetch(`https://openlibrary.org/${bookApi}/${bookId}.json`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function POST(req: Request) {
  const data = await req.json();

  const { userEmail } = data;

  const client = await connectToDatabase();
  const db = client.db();
  const DBFavoriteBooks = await db
    .collection("favoriteBooks")
    .find({ userEmail: userEmail })
    .toArray();

  const favoriteBooksData = await Promise.all(
    DBFavoriteBooks.map(async (book, index) => {
      const bookApi = book?.bookId.split("/")[1];
      const bookId = book?.bookId.split("/")[2];

      const data = await getData(bookApi, bookId);
      const transformedData = await dataTransformation(data);
      return transformedData;
    })
  );

  return NextResponse.json(favoriteBooksData);
}
