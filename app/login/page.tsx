"use client";
  import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    if (isSignup) {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }



const { data: session } = useSession();
const router = useRouter();

useEffect(() => {
  if (session) {
    router.push("/dashboard");
  }
}, [session]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-4 bg-white/5 p-6 rounded-xl">

        <h1 className="text-xl text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h1>

        {isSignup && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-white/10 rounded"
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-white/10 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-white/10 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-primary py-2 rounded"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full border py-2 rounded"
        >
          Continue with Google
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-center text-sm cursor-pointer"
        >
          {isSignup
            ? "Already have account? Login"
            : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
}