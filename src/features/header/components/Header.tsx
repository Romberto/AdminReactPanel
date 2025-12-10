import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold">Admin Panel</div>

        <nav className="flex gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Projects
          </Link>

          <Link
            to="/blog"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Blog
          </Link>

 
        </nav>
      </div>
    </header>
  );
}
