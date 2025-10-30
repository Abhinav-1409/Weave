"use client"

import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import { Search, User, MoreVertical } from "lucide-react"
import { useLazyQuery } from '@apollo/client/react';
import { GET_USERS } from '../graphql/gqlQuery.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useChat } from "../context/ChatContext.jsx";

const Sidebar = () => {
  const { selectedUser, setSelectedUser, users, getUsers, unseenMessages, setUnseenMessages } = useChat();
  const [input, setInput] = useState(false);
  const filteredUsers = input ? users.filter((user) => {
    user.name.toLowerCase().includes(input.toLowerCase())
  }) : users;
  const [getAllUsers, { _ }] = useLazyQuery(GET_USERS);
  const { token, onlineUsers } = useAuth();
  useEffect(() => {
    getUsers();
  }, [onlineUsers]);


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
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 flex-1"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user)
            }}
            key={index}
            className={`flex items-center gap-3 p-3 mx-2 my-1 rounded-lg cursor-pointer transition-all ${selectedUser?.id === user.id ? "bg-indigo-50 border border-indigo-200" : "hover:bg-slate-50"}`}
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
              <p className={`text-xs ${onlineUsers.includes(user) ? "text-green-600" : "text-slate-400"}`}>
                {onlineUsers.includes(user) ? "● Online" : "Offline"}
              </p>
              {unseenMessages[user.id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user.id]}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
