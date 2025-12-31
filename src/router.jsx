import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./routes/Dashboard";
import PrivateRoute from "./components/PrivateRoutes";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./routes/adminroutes/Dashboard";
import AdminLayout from "./layout/adminlayout/Layout";
import UserLayout from "./layout/userlayout/Layout";
import AddProduct from "./pages/adminPages/product/AddProduct";
import ManageProducts from "./pages/adminPages/product/ManageProducts";
import ManageOrders from "./pages/adminPages/orders/ManageOrders";
import ProductList from "./pages/clinetPages/ProductList";
import ProductDetail from "./pages/clinetPages/ProductDetail";
import CartPage from "./pages/clinetPages/CartPage";
import Checkout from "./pages/clinetPages/Checkout";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },

  // Admin Routes - Protected with AdminRoute
  {
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/admindashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/admin/products",
        element: <ManageProducts />,
      },
      {
        path: "/admin/orders",
        element: <ManageOrders />,
      },
    ],
  },

  // User Routes - Protected with PrivateRoute
  {
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/productlist",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);