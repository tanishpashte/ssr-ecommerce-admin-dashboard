"use client";

export default function DeleteButton({ id, onSuccess }) {
  async function handleDelete() {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onSuccess();
  }

  return (
  <button 
    onClick={handleDelete}       
    className="neo-button bg-red-300 text-black"
  >
      Delete
  </button>);
}
