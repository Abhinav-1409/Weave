// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
// import { Search, User } from 'lucide-react';

// const Sidebar = ({ selectedUser, setSelectedUser }) => {
//     const [userData, setUserData] = useState([]);
//     useEffect(() => {
//         setUserData([{
//             'profileImage': null, 'name': "Abhinav", 'activeStatus': 'online', '_id': 1,
//         }, {
//             'profileImage': null, 'name': "Abhinav", 'activeStatus': 'offline', '_id': 2,
//         }])
//     }, []);

//     const navigate = useNavigate();
//     return (
//         <div className={`bg-slate-200/60 h-full p-5 rounded-r-xl overflow-y-scroll scrollbar-hide text-slate-800 ${selectedUser ? "max-md:hidden" : ""}`}>
//             <div className="pb-5">
//                 <div className="flex justify-between items-center">
//                     <img src='https://www.shutterstock.com/shutterstock/photos/2156873317/display_1500/stock-vector-w-logo-vector-graphic-branding-letter-element-black-background-2156873317.jpg' alt="logo" className="max-w-10 cursor-pointer" />
//                     <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-700 text-gray-900 hidden group-hover:block">
//                         <button onClick={() => navigate('/profile')} className="cursor-pointer text-sm">Edit Profile</button>
//                         <hr className="my02 border-t border-gray-500" />
//                         <button onClick={() => navigate('/profile')} className="cursor-pointer text-sm">LogOut</button>
//                     </div>
//                 </div>
//                 <div className="bg-white rounded-full flex items-center gap-2 py-3 px-4 mt-5">
//                     <Search />
//                     <input type="text" className="bg-transparent border-none outline-none text-slate-700 text-xs placeholder-[#6b7280] flex-1" placeholder="Search user..." />
//                 </div>
//             </div>

//             <div className="flex flex-col"> 
//                 {userData.map((user, index) => (
//                     <div onClick={() => { setSelectedUser(user) }} key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`}>
//                         {user?.profileImage ? <img src={user?.profileImage} className="w-[35px] aspect-[1/1] rounded-full" /> : <User />}
//                         <div>
//                             <p>{user.name}</p>
//                             {user?.activeStatus === 'online' && <span className="text-green-400 text-xs">Online</span>}
//                             {user?.activeStatus === 'offline' && <span className="text-red-400 text-xs">Offline</span>}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//         </div>
//     )
// }

// export default Sidebar;

"use client"

import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import { Search, User, MoreVertical } from "lucide-react"

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [userData, setUserData] = useState([])
  useEffect(() => {
    setUserData([
      {
        profileImage: null,
        name: "Abhinav",
        activeStatus: "online",
        _id: 1,
      },
      {
        profileImage: null,
        name: "Sarah",
        activeStatus: "offline",
        _id: 2,
      },
    ])
  }, [])

//   const navigate = useNavigate();
  return (
    <div
      className={`bg-white border-r border-slate-200 h-full flex flex-col overflow-hidden ${selectedUser ? "max-md:hidden" : ""}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-slate-900">Messages</h1>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <MoreVertical size={18} className="text-slate-600" />
          </button>
        </div>
        {/* Search */}
        <div className="bg-slate-100 rounded-lg flex items-center gap-2 py-2 px-3">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 flex-1"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {userData.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user)
            }}
            key={index}
            className={`flex items-center gap-3 p-3 mx-2 my-1 rounded-lg cursor-pointer transition-all ${selectedUser?._id === user._id ? "bg-indigo-50 border border-indigo-200" : "hover:bg-slate-50"}`}
          >
            {user?.profileImage ? (
              <img
                src={user?.profileImage || "/placeholder.svg"}
                className="w-10 h-10 rounded-full object-cover"
                alt="profile"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className={`text-xs ${user?.activeStatus === "online" ? "text-green-600" : "text-slate-400"}`}>
                {user?.activeStatus === "online" ? "● Online" : "Offline"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
