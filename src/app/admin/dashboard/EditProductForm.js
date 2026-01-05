"use client";
import { useState } from "react";
import { productSchema } from "@/app/lib/productSchema";

export default function EditProductForm({ product, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: product._id,
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl || "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      productSchema.parse({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      let imageUrl = form.imageUrl;

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await up.json();
        imageUrl = data.url;
      }

      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          imageUrl,
        }),
      });

      onSuccess();
      setIsOpen(false);
    } catch (err) {
      alert("Invalid input or update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Edit trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="neo-button bg-blue-300"
      >
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="neo-box bg-white p-6 w-full max-w-lg space-y-4"
          >
            <h2 className="text-2xl font-extrabold">Edit Product</h2>

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt={form.name}
                className="w-24 h-24 object-cover border-4 border-black"
              />
            )}

            <div>
              <label className="font-bold">Name</label>
              <input
                className="neo-input"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="font-bold">Category</label>
              <input
                className="neo-input"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold">Price</label>
                <input
                  type="number"
                  className="neo-input"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="font-bold">Stock</label>
                <input
                  type="number"
                  className="neo-input"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="font-bold">Change Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="neo-button bg-green-300"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="neo-button bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
