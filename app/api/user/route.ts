import { hashPassword, verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "User has not been authenticated!" },
      { status: 401 }
    );
  }

  const data = await req.json();
  const { oldPassword, newPassword } = data;

  const userEmail = session.user?.email;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    return NextResponse.json(
      { message: "User was not found!" },
      { status: 404 }
    );
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    client.close();
    return NextResponse.json(
      { message: "Passwords are not equal!" },
      { status: 403 }
    );
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  return NextResponse.json(
    { message: "Password was updated!" },
    { status: 200 }
  );
}
