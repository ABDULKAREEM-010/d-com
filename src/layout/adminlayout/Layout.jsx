// src/components/Layout.jsx
import Navbar from "../../common/adminCommon/Navbar";
import Sidebar from "../../common/adminCommon/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default Layout;
