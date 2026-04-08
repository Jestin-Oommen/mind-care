"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <Button variant="outline" onClick={() => signOut()}>
        Logout ({session.user.name ?? "User"})
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn("google")}>
      Login
    </Button>
  );
}