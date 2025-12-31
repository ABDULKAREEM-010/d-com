// import React from 'react'
// import PreviewInfo from '../../../components/admincomponents/product/PreviewInfo'
// import ProductInfo from '../../../components/admincomponents/product/ProductInfo'


// const AddProduct = () => {
//   return (
//     <div className='flex h-full'>
//         <PreviewInfo />
//         <div className='flex-2/3 border '>
//         <ProductInfo />
//         </div>
//     </div>
//   )
// }

// export default AddProduct
import { useState } from "react";
import { addProduct } from "../../../adminServices/addproduct"; // your addProduct file
import { UserAuth } from "../../../context/AuthContext";

export default function AddProduct() {
  const { session } = UserAuth();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [taskImage, setTaskImage] = useState(null);

  // Protect page
  if (!session) {
    return <p className="p-4 text-red-500">Login required</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addProduct(form, taskImage);
      setMessage("✅ Product added successfully");

      // Reset form
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });
      setTaskImage(null);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock quantity"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
