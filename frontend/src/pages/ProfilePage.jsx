"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
import { ArrowLeft, User, Save, X } from "lucide-react"

const ProfilePage = () => {
  // const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  // const [formData, setFormData] = useState({
  //   name: user?.name || "",
  //   bio: user?.bio || "",
  //   profileImage: user?.profileImage || "",
  // })
  const [user, setUser] = useState({
    name: "Abhinav",
    bio: "Hello I'm Abhinav",
    profileImage: "",
  });
  const [formData, setFormData] = useState({
    name: "Abhinav",
    bio: "Hello I'm Abhinav",
    profileImage: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // updateProfile(formData)
    setIsEditing(false)
  }

  // const handleCancel = () => {
  //   setFormData({
  //     name: user?.name || "",
  //     bio: user?.bio || "",
  //     profileImage: user?.profileImage || "",
  //   })
  //   setIsEditing(false)
  // }

  const handleLogout = () => {
    // logout()
    navigate("/auth")
  }

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Please login first</p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ArrowLeft className="text-slate-600" size={24} />
          </button>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            {formData?.profileImage ? (
              <img
                src={formData?.profileImage || "/placeholder.svg"}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-indigo-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center mb-4 border-4 border-indigo-100">
                <User className="text-white" size={48} />
              </div>
            )}
            {isEditing && (
              <input
                type="text"
                name="profileImage"
                value={formData?.profileImage}
                onChange={handleChange}
                placeholder="Profile image URL"
                className="w-full max-w-xs px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mt-4"
              />
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-lg text-slate-900">{user?.name}</p>
              )}
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <p className="text-lg text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">{user?.email}</p>
              <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData?.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-slate-700 whitespace-pre-wrap">{user?.bio || "No bio added yet"}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-slate-200">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={20} />
                  Save Changes
                </button>
                <button
                  // onClick={handleCancel}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <X size={20} />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
