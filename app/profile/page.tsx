import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProfilePageContent from "@/components/Profile/ProfilePageContent";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth");
  }
  
  return (
    <div>
      <ProfilePageContent />
    </div>
  );
}

export default ProfilePage;
