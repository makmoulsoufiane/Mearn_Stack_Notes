import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router";
import { notesPath } from "./utils/notesPath";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import RegistrePage from "./pages/RegistrePage";
import NotfoundPage from "./pages/NotfoundPage";

const ProtectedRoute = ({ children }) => {
  const { userId } = useParams();
  const isConnected = Boolean(localStorage.getItem("token"));

  if (!isConnected || notesPath() === "/login") {
    return <Navigate to="/login" replace />;
  }

  if (userId && `/notes/${encodeURIComponent(userId)}` !== notesPath()) {
    return <Navigate to={notesPath()} replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="relative h-full w-full" data-theme="luxury">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/notes"
          element={<ProtectedRoute><Navigate to={notesPath()} replace /></ProtectedRoute>}
        />
        <Route
          path="/notes/:userId"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <NoteDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registre" element={<RegistrePage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
