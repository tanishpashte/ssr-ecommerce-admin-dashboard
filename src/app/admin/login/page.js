"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h2>Admin Login</h2>
      <button
        onClick={() =>
          signIn("credentials", {
            email: "admin@test.com",
            password: "admin123",
            callbackUrl: "/admin/dashboard",
          })
        }
      >
        Login as Admin
      </button>
    </div>
  );
}
