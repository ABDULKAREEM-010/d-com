import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signInUser,signInWithGoogle} = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
  
    // 1️⃣ Sign in
    const { data, error } = await signInUser(email, password);
  
    if (error) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
      return;
    }
  
    // 2️⃣ Safety check
    if (!data?.user) {
      setError("User not found");
      return;
    }
  
    const userId = data.user.id;
  
    // 3️⃣ Fetch role from profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
  
    if (profileError || !profile) {
      setError("Unable to fetch user role");
      return;
    }
  
    // 4️⃣ Role-based navigation
    if (profile.role === "admin") {
      navigate("/admindashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };
  
  
  return (
    <div>
      <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Sign in</h2>
        <p>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
        <div className="flex flex-col py-4">
          {/* <label htmlFor="Email">Email</label> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col py-4">
          {/* <label htmlFor="Password">Password</label> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-2"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button className="w-full mt-4">Sign In</button>
        <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>  {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;