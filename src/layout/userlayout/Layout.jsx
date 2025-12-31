import { Outlet } from "react-router-dom";
import UserNavbar from "../../common/useCommon/Navbar";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
}
