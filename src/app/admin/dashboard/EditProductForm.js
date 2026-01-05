"use client";
import { useState } from "react";
import { productSchema } from "@/app/lib/productSchema";

export default function EditProductForm({ product, onSuccess }) {
    const [imageFile, setImageFile] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(product);

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
        ...form,
        imageUrl,
        price: Number(form.price),
        stock: Number(form.stock),
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
        {form.imageUrl && (
      <img src={form.imageUrl} width="80" alt="Product" />
    )}
      {step === 1 && (
        <>
          <input value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <button onClick={() => setStep(2)}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <input value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}/>
          <button onClick={handleSubmit}>Save</button>
        </>
      )}
    </>
  );
}
