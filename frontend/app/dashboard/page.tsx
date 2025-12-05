"use client";

import React from "react";
import { useSession } from "@/lib/auth-client"; // Import the hook you exported

const Page = () => {
  const { data: session, isPending, error } = useSession();

  if (isPending) return <div>Loading...</div>;

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div>
      <h1>Hi, {session.user.name}</h1>
      <p>Your email is: {session.user.email}</p>
      <p>User ID: {session.user.id}</p>
    </div>
  );
};

export default Page;
