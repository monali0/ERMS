import { removeAccessToken, removeRefreshToken } from "@/lib/utils";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useLogOut from "@/hooks/useLogOut";
interface PageLayoutProps {
  children: ReactNode;
}

const CommonPageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout, isLoading } = useLogOut();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">MyApp</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default CommonPageLayout;
