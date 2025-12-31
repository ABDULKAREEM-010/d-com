import { useEffect, useState } from "react";
import { getAllProducts } from "../../adminServices/addproduct";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedProducts((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  if (loading) return <p className="p-4 text-center">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-shadow"
          >
            {/* IMAGE */}
            <Link to={`/product/${product.id}`}>
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3 hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-3">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </Link>

            {/* DATA */}
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>

            <p className="text-xl font-bold text-blue-600 mb-2">₹{product.price}</p>

            <p className={`text-sm mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </p>

            <p className="text-xs text-gray-500 mb-4 line-clamp-2">
              {product.description || "No description available"}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className={`flex-1 py-2 px-4 rounded font-semibold ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : addedProducts[product.id]
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {addedProducts[product.id] ? '✓ Added' : 'Add to Cart'}
              </button>
              
              <Link
                to={`/product/${product.id}`}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-semibold hover:bg-gray-300"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
