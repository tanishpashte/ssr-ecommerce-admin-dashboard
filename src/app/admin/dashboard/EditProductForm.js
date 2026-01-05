"use client";
import { useState } from "react";
import { productSchema } from "@/app/lib/productSchema";

export default function EditProductForm({ product, onSuccess }) {
    const [imageFile, setImageFile] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
  ...product,
  id: product._id,   
});
const [isEditing, setIsEditing] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    productSchema.parse({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    let imageUrl = form.imageUrl || "";

    if(imageFile){

        const fileData = new FormData();
        fileData.append("file", imageFile);
    
        const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fileData,
        });
        const data = await uploadRes.json();
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
    setForm((prev) => ({
        ...prev,
        imageUrl,
    }));
    onSuccess();
  }

 
 return (
  <>
    {!isEditing && (
      <button
        onClick={() => setIsEditing(true)}
        className="neo-button bg-blue-300 text-black"
      >
        Edit
      </button>
    )}

    {isEditing && (
      <div className="neo-box p-4 mt-2">
        {form.imageUrl && (
          <img src={form.imageUrl} width="80" alt="Product" />
        )}

        {step === 1 && (
          <>
            <input
              className="neo-input mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="neo-input mb-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <button
              className="neo-button bg-yellow-300"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="neo-input mb-2"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="neo-input mb-2"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <div className="flex gap-2 mt-3">
              <button
                className="neo-button bg-green-300"
                onClick={handleSubmit}
              >
                Save
              </button>

              <button
                className="neo-button bg-gray-200"
                onClick={() => {
                  setIsEditing(false);
                  setStep(1);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    )}
  </>
);
 
}
