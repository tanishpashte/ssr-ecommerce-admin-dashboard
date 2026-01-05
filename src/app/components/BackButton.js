"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ label = "Back" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="neo-button bg-gray-200 fixed top-5 left-5"
    >
      ← {label}
    </button>
  );
}
