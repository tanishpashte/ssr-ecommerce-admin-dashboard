import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";
import AnalyticsClient from "./AnalyticsClient";
import BackButton from "@/app/components/BackButton";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  await connectDB();
  const products = await Product.find().lean();

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-extrabold text-white  mt-4">Analytics</h1>
    <BackButton />
      <AnalyticsClient
        products={products.map((p) => ({
          ...p,
          _id: p._id.toString(),
        }))}
      />
    </div>
  );
}
