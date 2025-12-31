import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { UserAuth } from "../../context/AuthContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { session } = UserAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("paypal"); // "paypal" or "cod"

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
        <p className="text-gray-600">You need to be logged in to checkout.</p>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/productlist")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const createOrder = async (paymentStatus = "pending", transactionId = null) => {
    try {
      // Save order to database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: session.user.id,
            total_amount: getCartTotal(),
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            transaction_id: transactionId,
            shipping_address: JSON.stringify(shippingInfo),
            status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Save order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const handleCODOrder = async (e) => {
    e.preventDefault();

    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city) {
      alert("Please fill in all required shipping information");
      return;
    }

    try {
      const order = await createOrder("pending", null);
      setOrderDetails(order);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      alert("Failed to place order: " + error.message);
    }
  };

  // PayPal Integration
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  if (orderPlaced && orderDetails) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 mb-6">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div className="bg-white p-4 rounded border mt-4">
            <p className="font-semibold">Order ID: #{orderDetails.id}</p>
            <p>Total: ₹{orderDetails.total_amount.toFixed(2)}</p>
            <p>Payment Method: {orderDetails.payment_method.toUpperCase()}</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/productlist")}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Shipping Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Shipping Information</h3>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded"
                  placeholder="Mumbai"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  placeholder="400001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
                placeholder="+91 1234567890"
              />
            </div>
          </form>
        </div>

        {/* Right: Order Summary & Payment */}
        <div>
          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Payment Method</h3>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="font-semibold">PayPal</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="font-semibold">Cash on Delivery</span>
              </label>
            </div>

            {paymentMethod === "paypal" ? (
              <div className="mt-4">
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: (getCartTotal() / 83).toFixed(2), // Convert INR to USD (approx)
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      try {
                        const order = await createOrder(
                          "completed",
                          details.id
                        );
                        setOrderDetails(order);
                        setOrderPlaced(true);
                        clearCart();
                      } catch (error) {
                        alert("Error completing order: " + error.message);
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("Payment failed. Please try again.");
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button
                onClick={handleCODOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Place Order (Cash on Delivery)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
