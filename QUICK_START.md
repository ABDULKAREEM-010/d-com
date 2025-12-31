# Quick Start Guide

Get your e-commerce application running in 5 minutes!

## Prerequisites
- Node.js installed
- Supabase account created
- PayPal Developer account (optional for testing)

## 🚀 Fast Setup (5 Steps)

### Step 1: Install Dependencies
```bash
cd d-com
npm install
```

### Step 2: Configure Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Copy project URL and anon key
3. Go to SQL Editor and run `database-setup.sql`
4. Create storage bucket named `product_img` (make it public)

### Step 3: Set Environment Variables

Create `.env` file:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
VITE_PAYPAL_CLIENT_ID=test
```

### Step 4: Create Admin User

```bash
# Start the app
npm run dev

# Open browser: http://localhost:5173
# Sign up with any email
```

Then in Supabase Dashboard → Table Editor → profiles:
- Find your user
- Change `role` to `admin`

### Step 5: Test the Application

**User Panel:**
1. Go to http://localhost:5173/productlist
2. Click any product
3. Add to cart
4. Go to checkout

**Admin Panel:**
1. Sign in with admin account
2. Visit http://localhost:5173/admindashboard
3. Add a product at http://localhost:5173/addproduct

## 🎯 Default Routes

| Type | Route | Description |
|------|-------|-------------|
| Public | `/` | Sign in page |
| Public | `/signup` | Sign up page |
| User | `/dashboard` | User dashboard |
| User | `/productlist` | Browse products |
| User | `/cart` | Shopping cart |
| Admin | `/admindashboard` | Admin dashboard |
| Admin | `/addproduct` | Add product |
| Admin | `/admin/products` | Manage products |

## 📦 What You Get

✅ Complete authentication system  
✅ Product management (CRUD)  
✅ Shopping cart  
✅ PayPal checkout  
✅ Order management  
✅ Admin & User dashboards  
✅ Role-based access control  

## 🔧 Optional: PayPal Setup

For actual payments:
1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create an app
3. Copy Client ID to `.env`

For testing without PayPal:
- Use "Cash on Delivery" option in checkout

## 🐛 Troubleshooting

**Can't sign in?**
- Check Supabase URL and key in `.env`
- Enable Email provider in Supabase Dashboard

**Images not uploading?**
- Verify `product_img` bucket exists
- Make bucket public in Supabase Storage

**Admin routes not accessible?**
- Check user role in profiles table
- Should be `'admin'` not `'user'`

## 📚 Next Steps

1. Read `PROJECT_README.md` for full documentation
2. Check `SETUP_GUIDE.md` for detailed setup
3. Review `IMPLEMENTATION_SUMMARY.md` for features

## 🎉 You're Ready!

Your e-commerce application is now running at:
**http://localhost:5173**

Happy coding! 🚀
