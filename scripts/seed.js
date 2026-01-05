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
    imageUrl: "",
  },
  {
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 3499,
    stock: 12,
    imageUrl: "",
  },
  {
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 18,
    imageUrl: "",
  },
  {
    name: "Backpack",
    category: "Accessories",
    price: 1799,
    stock: 30,
    imageUrl: "",
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: 5999,
    stock: 10,
    imageUrl: "",
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
    imageUrl: "",
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 2299,
    stock: 15,
    imageUrl: "",
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
