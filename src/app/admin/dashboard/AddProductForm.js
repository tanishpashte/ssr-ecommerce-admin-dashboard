"use client";
import { useState } from "react";

export default function AddProductForm({ onSuccess }) {
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    let url = form.imageUrl || "";

    if (imageFile) {
        const fileData = new FormData();
        fileData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: fileData,
        });
        const data = await uploadRes.json();
        url = data.url;
    }


    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        imageUrl: url,
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
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}/>
      <button type="submit">Add Product</button>
    </form>
  );
}
