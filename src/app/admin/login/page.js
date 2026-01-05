"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/admin/dashboard";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/hero-bg.avif')" }}>
      <form
        onSubmit={handleSubmit}
        className="neo-box p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-extrabold mb-6">Admin Login</h1>

        {error && (
          <div className="border-4 border-black bg-red-200 p-2 mb-4 font-bold">
            {error}
          </div>
        )}

        <label className="font-bold">Email</label>
        <input
          className="neo-input mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="font-bold">Password</label>
        <input
          className="neo-input mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="neo-button bg-blue-300 w-full">
          Login
        </button>

        <Link href="/">
          <button className="neo-button bg-yellow-300 fixed top-5 left-5">
            Back to Home
          </button>
        </Link>
      </form>
    </div>
  );
}
