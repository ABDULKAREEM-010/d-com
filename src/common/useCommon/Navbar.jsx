import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function UserNavbar() {
  const { session, signOut } = UserAuth();
  const { getCartCount } = useCart();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="text-2xl font-bold hover:text-blue-200">
            🛒 E-Shop
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="hover:text-blue-200 font-semibold transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/productlist"
              className="hover:text-blue-200 font-semibold transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="hover:text-blue-200 font-semibold flex items-center gap-2 transition-colors relative"
            >
              <span>🛒 Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            {session?.user?.email && (
              <span className="hidden md:block text-sm">
                {session.user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-4 mt-4">
          <Link to="/dashboard" className="text-sm hover:text-blue-200">
            Dashboard
          </Link>
          <Link to="/productlist" className="text-sm hover:text-blue-200">
            Products
          </Link>
          <Link to="/cart" className="text-sm hover:text-blue-200 relative">
            Cart
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
