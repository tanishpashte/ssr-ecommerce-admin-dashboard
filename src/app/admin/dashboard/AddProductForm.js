"use client";
import { useState } from "react";

export default function AddProductForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await up.json();
        imageUrl = data.url;
      }

      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      setForm({ name: "", category: "", price: "", stock: "" });
      setImageFile(null);
      onSuccess();
    } catch (e) {
      setError("Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="neo-box bg-red-200 p-3 font-bold">{error}</div>
      )}

      <div>
        <label className="font-bold block mb-1">Product Name</label>
        <input
          className="neo-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="font-bold block mb-1">Category</label>
        <input
          className="neo-input"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-bold block mb-1">Price (₹)</label>
          <input
            type="number"
            className="neo-input"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="font-bold block mb-1">Stock</label>
          <input
            type="number"
            className="neo-input"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label className="font-bold block mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`neo-button bg-green-300 ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
