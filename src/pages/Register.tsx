import React from "react";
import { User, Mail, Lock } from "lucide-react";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterModelPage {
  login: () => void
}

const Register = ({ login }: RegisterModelPage) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Register to start using your account
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <User size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <Mail size={18} className="text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
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
                placeholder="Create a password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="flex items-center rounded-lg border border-slate-300 px-3 focus-within:border-blue-500">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" />
            I agree to the Terms & Conditions
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?
          <button onClick={() => login()} className="ml-1 font-medium text-blue-600 hover:text-blue-700">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;