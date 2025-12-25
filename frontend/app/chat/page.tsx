"use client";

import { useSession } from "@/lib/auth-client"; // Import the hook you exported
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();

  if (isPending) return <div>Loading...</div>;

  if (!session) {
    return <div>Not signed in</div>;
  }

  if (!session.user.username) {
    router.push("/username");
  }

  return (
    <div>
      <h1>Hi, {session.user.name}</h1>
      <p>Your email is: {session.user.email}</p>
      <p>User ID: {session.user.id}</p>
      {/* for testing */}
      <p>Username: {session.user.username}</p>
    </div>
  );
};

export default Page;
