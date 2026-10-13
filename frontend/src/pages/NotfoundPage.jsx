import React from "react";
import { ArrowLeftIcon, HomeIcon, SearchXIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { notesPath } from "../utils/notesPath";

const NotfoundPage = () => {
  const navigate = useNavigate();
  const isConnected = Boolean(localStorage.getItem("token"));

  return (
    <main className="min-h-screen px-6 py-10 flex items-center justify-center">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SearchXIcon className="h-10 w-10" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          404 error
        </p>

        <h1 className="mt-3 text-4xl font-bold text-base-content sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base text-base-content/70">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </button>

          <Link
            to={isConnected ? notesPath() : "/login"}
            className="btn btn-primary"
          >
            <HomeIcon className="h-5 w-5" />
            {isConnected ? "Back to Notes" : "Back to Login"}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotfoundPage;
