import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 422 }
    );
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({
    email: email,
  });
  if (existingUser) {
    client.close();
    return NextResponse.json(
      { message: "User already exists!" },
      { status: 422 }
    );
  }

  const hashedPassword = await hashPassword(password);

  await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });
  client.close();
  return NextResponse.json(
    { message: "User was successfully created" },
    { status: 201 }
  );
}
