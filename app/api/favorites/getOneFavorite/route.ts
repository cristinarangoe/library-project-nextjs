import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const { userEmail, bookId } = data;

  const client = await connectToDatabase();
  const db = client.db();
  const isFavorite = await db
    .collection("favoriteBooks")
    .findOne({ userEmail: userEmail, bookId: bookId })

  return NextResponse.json(isFavorite);
}
