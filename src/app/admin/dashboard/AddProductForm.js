"use client";
import { useState } from "react";

export default function AddProductForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    setForm({ name: "", price: "", stock: "", category: "" });
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Price" value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Stock" value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })} />
      <input placeholder="Category" value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <button type="submit">Add Product</button>
    </form>
  );
}
