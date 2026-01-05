import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../src/app/models/Product.js";

dotenv.config({path: ".env.local"});

const MONGODB_URI = process.env.MONGODB_URI;

const products = [
  {
    name: "Wireless Mouse",
    category: "Electronics",
    price: 999,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400",
  },
  {
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 3499,
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
  },
  {
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    name: "Backpack",
    category: "Accessories",
    price: 1799,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1514474959185-1472d4c4e6e0?w=400",
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: 5999,
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?w=400",
  },
  {
    name: "Water Bottle",
    category: "Home",
    price: 499,
    stock: 50,
    imageUrl: "",
  },
  {
    name: "Desk Lamp",
    category: "Home",
    price: 1299,
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 2299,
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=400",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");

    await Product.deleteMany(); // optional: clean slate
    await Product.insertMany(products);

    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
