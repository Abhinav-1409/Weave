import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { login, signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault()
    setError("");

    if (isLogin) {
      if (!formData.email || !formData.password) {
        toast.warning("Please fill in all fields");
        return;
      }

      const res = await login(formData.email, formData.password);
      console.log(res);
      if (res.success) {
        navigate("/");
      } else {
        setError(res.message);
      }
    }
    else {
      if (!formData.name || !formData.email || !formData.password) {
        toast.warning("Please fill in all fields")
        return;
      }
      if (formData.password.length < 6) {
        toast.warning("Password must be at least 6 characters")
        return;
      }
      const res = await signup(formData.name, formData.email, formData.password);
      console.log(res);
      if (res.success) {
        toast.success('Login To Continue');
        setIsLogin(true);
      } else {
        setError(res.message);
      }
      setLoading(false);
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: "", email: "", password: "", bio: "" })
    setError("")
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">ChatApp</h1>
          <p className="text-slate-600">{isLogin ? "Welcome back" : "Join our community"}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${isLogin ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${!isLogin ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bio Field (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-slate-400" size={20} />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows="3"
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-6"
            >
              {isLogin ? loading ? "Loading..." : "Login" : loading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-sm mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleMode} className="text-indigo-600 hover:text-indigo-700 font-medium">
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
