import { supabase } from "../supabaseClient";

export async function addProduct(product, file) {
  let image_url = null;

  console.group("🧩 addProduct Debug Start");

  try {
    // 1️⃣ Auth check
    const { data: authData } = await supabase.auth.getUser();
    console.log("Auth user:", authData?.user?.id);

    if (!authData?.user) {
      throw new Error("User not authenticated");
    }

    // 2️⃣ Upload image
    if (file) {
      const safeFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      console.log("📤 Uploading file:", safeFileName);
      console.log("File info:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      const uploadRes = await supabase
        .storage
        .from("product_img")
        .upload(safeFileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log("Upload response:", uploadRes);

      if (uploadRes.error) {
        console.error("❌ Storage upload error:", uploadRes.error);
        throw new Error(uploadRes.error.message);
      }

      // 3️⃣ Get public URL
      const urlRes = supabase
        .storage
        .from("product_img")
        .getPublicUrl(safeFileName);

      console.log("Public URL response:", urlRes);

      if (!urlRes?.data?.publicUrl) {
        throw new Error("Public URL not generated");
      }

      image_url = urlRes.data.publicUrl;
      console.log("✅ Image URL:", image_url);
    } else {
      console.warn("⚠️ No image file provided");
    }

    // 4️⃣ Insert product
    console.log("📦 Inserting product:", {
      ...product,
      image_url,
    });

    const insertRes = await supabase
      .from("products")
      .insert([
        {
          name: product.name,
          category: product.category,
          price: Number(product.price),
          stock: Number(product.stock),
          description: product.description,
          image_url,
          status: "active",
        },
      ])
      .select()
      .single();

    console.log("Insert response:", insertRes);

    if (insertRes.error) {
      console.error("❌ Insert error:", insertRes.error);
      throw new Error(insertRes.error.message);
    }

    console.log("✅ Product inserted:", insertRes.data);
    return insertRes.data;

  } catch (err) {
    console.error("🔥 addProduct FAILED:", err.message);
    throw err;
  } finally {
    console.groupEnd();
  }
}
export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}