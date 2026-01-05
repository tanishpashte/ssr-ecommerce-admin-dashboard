import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fefefe]">
      <div className="neo-box p-10 max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold">
          E-commerce Admin Dashboard
        </h1>

        <p className="text-lg font-bold">
          Server-rendered product management dashboard built with Next.js.
        </p>

        <ul className="text-left font-bold space-y-2">
          <li>• Product CRUD with image uploads</li>
          <li>• Admin-only authentication</li>
          <li>• Sales & stock analytics</li>
        </ul>

        <Link
          href="/admin/login"
          className="neo-button bg-blue-300 inline-block"
        >
          Admin Login
        </Link>
      </div>
    </main>
  );
}
