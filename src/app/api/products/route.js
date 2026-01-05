import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json(product);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  await connectDB();
  const { id, ...data } = await req.json();
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}
