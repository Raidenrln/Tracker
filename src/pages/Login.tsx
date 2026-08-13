import React, { useState, type FormEvent } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    // 1. MUST invoke the function e.preventDefault()
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // 2. Pass username and password in the request body
      const response = await axios.post("http://192.168.0.101:3000/api/login", {
        username,
        password,
      });

      console.log("Login successful:", response.data);
      alert(response.data.message); // or handle navigation/session here

    } catch (error: any) {
      // 3. Extract the error message returned from Express server
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Login failed");
      } else {
        setErrorMessage("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your account
          </p>
        </div>

        {/* Display Error Alert if Login Fails */}
        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <Mail size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-3 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?
          <button className="ml-1 font-medium text-blue-600 hover:text-blue-700">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;