import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
      toast.success("Successfully registered! Please log in.");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = Object.values(err.response.data).flat();
        setError(backendErrors.join(" ") || "Registration failed.");
        toast.error(backendErrors.join(" ") || "Registration failed.");
      } else {
        setError("Registration failed. Please check your connection.");
        toast.error("Registration failed. Please check your connection.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-primary min-h-screen text-white flex justify-center items-center py-12">
      <form
        onSubmit={handleSignup}
        className="bg-soft p-8 rounded-2xl max-w-md w-full shadow-2xl ring-1 ring-accent/20"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center bg-red-500/10 py-2 rounded px-2">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 mb-2 text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent-neon text-black font-bold py-2 rounded-lg hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center mt-4 text-gray-400 text-sm">
          Already a member?{" "}
          <Link to="/login" className="text-accent-neon underline hover:opacity-80">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
