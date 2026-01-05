"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="neo-button bg-red-300 text-black"
    >
      Logout
    </button>
  );
}
