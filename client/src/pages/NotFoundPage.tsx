import { FiHome } from "react-icons/fi";

function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 text-gray-700 px-4">
      {/* Illustration */}
      <div className="mb-6">
        <svg
          className="w-48 h-48 text-blue-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">
        404 – Page Not Found
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-center max-w-md mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved. Don’t
        worry, let’s get you back on track.
      </p>

      {/* Back to home */}
      <a
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5"
      >
        <FiHome className="w-5 h-5" />
        Back to Home
      </a>

      {/* Footer note */}
      <p className="mt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </p>
    </div>
  );
}

export default NotFoundPage;
