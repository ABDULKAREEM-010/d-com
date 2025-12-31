import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { session, signOut } = UserAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id) return;

      try {
        // Fetch user profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setUserProfile(profile);

        // Fetch user orders
        const { data: ordersData, error } = await supabase
          .from("orders")
          .select("*, order_items(*, products(name, image_url))")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(ordersData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logged out");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-lg opacity-90">
          {session?.user?.email || "Customer"}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/productlist"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
        >
          <div className="text-4xl mb-3">🛍️</div>
          <h3 className="text-xl font-bold mb-2">Browse Products</h3>
          <p className="text-gray-600">Explore our collection</p>
        </Link>

        <Link
          to="/cart"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
        >
          <div className="text-4xl mb-3">🛒</div>
          <h3 className="text-xl font-bold mb-2">My Cart</h3>
          <p className="text-gray-600">View your cart items</p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-3">📦</div>
          <h3 className="text-xl font-bold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Link
              to="/productlist"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{order.total_amount.toFixed(2)}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.payment_status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-semibold mb-2">Items:</p>
                  <div className="space-y-2">
                    {order.order_items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        {item.products?.image_url && (
                          <img
                            src={item.products.image_url}
                            alt={item.products.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{item.products?.name || "Product"}</p>
                          <p className="text-gray-500">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
