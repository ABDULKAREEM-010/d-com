# E-Commerce Application - React.js Frontend

A full-featured e-commerce application built with React.js, featuring separate Admin and User panels with PayPal payment integration.

## 🚀 Features

### User Panel
- **Authentication**: Sign up/Sign in with email/password or Google OAuth
- **Product Browsing**: View all products with search and filtering
- **Product Details**: Detailed product information with image gallery
- **Shopping Cart**: Add/remove items, update quantities, persistent cart using localStorage
- **Checkout**: Integrated PayPal payment gateway and Cash on Delivery option
- **Order History**: View past orders with detailed information
- **Responsive Design**: Mobile-friendly interface

### Admin Panel
- **Admin Dashboard**: Overview of products, orders, and revenue statistics
- **Product Management**: Add, edit, delete products with image upload
- **Order Management**: View all orders, update order status
- **Role-Based Access**: Protected routes for admin-only access
- **Inventory Tracking**: Monitor stock levels

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Routing**: React Router DOM 7.11.0
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password + Google OAuth)
- **Payment**: PayPal SDK
- **Styling**: Tailwind CSS 4.1.18
- **Build Tool**: Vite 7.2.4
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd d-com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Set up Supabase Database**

   Create the following tables in your Supabase project:

   **profiles table**
   ```sql
   CREATE TABLE profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id),
     email TEXT,
     role TEXT DEFAULT 'user',
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

   **products table**
   ```sql
   CREATE TABLE products (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     category TEXT,
     price NUMERIC NOT NULL,
     stock INTEGER DEFAULT 0,
     description TEXT,
     image_url TEXT,
     status TEXT DEFAULT 'active',
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

   **orders table**
   ```sql
   CREATE TABLE orders (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     total_amount NUMERIC NOT NULL,
     payment_method TEXT,
     payment_status TEXT DEFAULT 'pending',
     transaction_id TEXT,
     shipping_address TEXT,
     status TEXT DEFAULT 'pending',
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

   **order_items table**
   ```sql
   CREATE TABLE order_items (
     id BIGSERIAL PRIMARY KEY,
     order_id BIGINT REFERENCES orders(id),
     product_id BIGINT REFERENCES products(id),
     quantity INTEGER NOT NULL,
     price NUMERIC NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

5. **Set up Supabase Storage**

   Create a storage bucket named `product_img` for product images and make it public.

6. **Create an admin user**

   After signing up, manually update the `profiles` table to set a user's role to 'admin':
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
   ```

## 🏃‍♂️ Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Application Structure

```
src/
├── adminServices/            # Admin API services
│   └── addproduct.jsx       # Product CRUD operations
├── common/                   # Shared components
│   ├── adminCommon/         # Admin-specific common components
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── useCommon/           # User-specific common components
│       └── Navbar.jsx
├── components/              # Reusable components
│   ├── AdminRoute.jsx       # Admin route protection
│   ├── PrivateRoutes.jsx    # User route protection
│   ├── Signin.jsx
│   └── Signup.jsx
├── context/                 # React Context
│   ├── AuthContext.jsx      # Authentication state
│   └── CartContext.jsx      # Shopping cart state
├── layout/                  # Layout components
│   ├── adminlayout/
│   │   └── Layout.jsx
│   └── userlayout/
│       └── Layout.jsx
├── pages/                   # Page components
│   ├── adminPages/
│   │   ├── orders/
│   │   │   └── ManageOrders.jsx
│   │   └── product/
│   │       ├── AddProduct.jsx
│   │       └── ManageProducts.jsx
│   └── clinetPages/
│       ├── CartPage.jsx
│       ├── Checkout.jsx
│       ├── ProductDetail.jsx
│       └── ProductList.jsx
├── routes/                  # Route-specific components
│   ├── Dashboard.jsx        # User dashboard
│   └── adminroutes/
│       └── Dashboard.jsx    # Admin dashboard
├── App.jsx
├── main.jsx
├── router.jsx               # Route configuration
└── supabaseClient.js        # Supabase client setup
```

## 🔐 Authentication Flow

1. Users can sign up/sign in using email/password or Google OAuth
2. On successful login, the user's role is fetched from the `profiles` table
3. Admin users are redirected to `/admindashboard`
4. Regular users are redirected to `/dashboard`
5. Protected routes check authentication status and role before granting access

## 💳 Payment Integration

The application supports two payment methods:

1. **PayPal**: Integrated using `@paypal/react-paypal-js`
   - Requires PayPal Client ID in environment variables
   - Handles currency conversion (INR to USD)
   - Creates order in database after successful payment

2. **Cash on Delivery (COD)**: 
   - Simple order placement without payment
   - Order status set to 'pending'

## 🎨 Key Features Implementation

### Shopping Cart
- Persistent cart using localStorage
- Add/remove items
- Update quantities
- Real-time total calculation
- Cart count badge in navbar

### Role-Based Access Control
- `PrivateRoute`: Protects all authenticated routes
- `AdminRoute`: Restricts admin panel access to admin users only
- Automatic redirection based on user role

### Product Management
- Image upload to Supabase Storage
- CRUD operations on products
- Real-time inventory tracking
- Category-based organization

### Order Management
- Complete order tracking
- Status updates (pending, processing, shipped, delivered, cancelled)
- Order details with items and shipping information
- Revenue calculation

## 🚦 Routes

### Public Routes
- `/` - Landing page (Sign in)
- `/signup` - User registration
- `/signin` - User login

### User Routes (Protected)
- `/dashboard` - User dashboard with order history
- `/productlist` - Browse all products
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout and payment

### Admin Routes (Admin Only)
- `/admindashboard` - Admin dashboard with statistics
- `/addproduct` - Add new product
- `/admin/products` - Manage products (edit/delete)
- `/admin/orders` - View and manage orders

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable Email and Google OAuth providers in Authentication settings
3. Create the required tables and storage bucket
4. Copy your project URL and anon key to `.env`

### PayPal Setup
1. Create a PayPal developer account
2. Create a new app in the PayPal Developer Dashboard
3. Copy the Client ID to `.env`

## 📝 Future Enhancements

- Product search and filtering
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Advanced analytics dashboard
- Multi-currency support
- Discount codes and coupons
- Real-time inventory alerts

## 🤝 Contributing

This project is part of a technical assignment. For any questions or issues, please contact the development team.

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ using React and Supabase**
