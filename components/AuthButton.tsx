"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">

        {/* Avatar */}
        {session.user.image ? (
          <img
            src={session.user.image}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            {session.user.name?.[0] || "U"}
          </div>
        )}

        {/* Name */}
        <span>{session.user.name}</span>

        <Button size="sm" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button size="sm">Login</Button>
    </Link>
  );
}