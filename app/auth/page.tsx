import AuthForm from "@/components/Profile/AuthForm";
import { getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function Authentication() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/profile')
  }
  return <AuthForm/>;
}

export default Authentication;
