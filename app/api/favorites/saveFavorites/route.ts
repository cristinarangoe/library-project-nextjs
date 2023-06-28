import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { bookId, name, userEmail } = data;

  const client = await connectToDatabase();
  const db = client.db();

  const existingFavoriteBook = await db.collection("favoriteBooks").findOne({
    bookId: bookId,
    userEmail: userEmail,
  });
  if (existingFavoriteBook) {
    await db
      .collection("favoriteBooks")
      .deleteOne({ bookId: bookId, userEmail: userEmail });
    client.close();
    return NextResponse.json(
      { message: "Book was succesfully removed from database" },
      { status: 200 }
    );
  } else {
    await db
      .collection("favoriteBooks")
      .insertOne({ bookId: bookId, name: name, userEmail: userEmail });
    client.close();
    return NextResponse.json(
      { message: "Favorite Book was succesfully added to the database" },
      { status: 201 }
    );
  }
}
