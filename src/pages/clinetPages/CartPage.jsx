import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">
          Browse our products and add items to your cart!
        </p>
        <Link
          to="/productlist"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            {/* Product Image */}
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                No Image
              </div>
            )}

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-lg font-bold text-blue-600 mt-1">
                ₹{item.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right w-24">
              <p className="font-bold">₹{item.price * item.quantity}</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total Items:</span>
          <span className="text-lg">{getCartCount()}</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-blue-600">
            ₹{getCartTotal().toFixed(2)}
          </span>
        </div>

        <div className="flex gap-4">
          <Link
            to="/productlist"
            className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 text-center font-semibold"
          >
            Continue Shopping
          </Link>
          <Link
            to="/checkout"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
