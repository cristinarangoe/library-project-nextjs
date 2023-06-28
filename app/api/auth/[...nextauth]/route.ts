import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: email,
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          client.close();
          throw new Error("could not log you in!");
        }
        client.close();
        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/auth'
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

