import React, { useState, useEffect, useRef } from "react";
import { BadgeInfo, User, X, MessageSquareMore, Images, Send } from "lucide-react"
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const ChatContainer = () => {
  const { selectedUser, setSelectedUser, messages, sendMessage, getMessages } = useChat();
  const scrollEnd = useRef()
  const {user, onlineUsers} = useAuth();
  

  useEffect(() => {
    if (scrollEnd.current) scrollEnd.current.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedUser])

  const isFromSelected = (msg) => selectedUser && msg.senderId === selectedUser._id

  return selectedUser ? (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          {selectedUser?.profileImage ? (
            <img
              src={selectedUser.profileImage || "/placeholder.svg"}
              className="w-10 h-10 rounded-full object-cover"
              alt="pp"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white">
              <User size={20} />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">{selectedUser?.name}</p>
            <p className="text-xs text-slate-500">
              {selectedUser?.activeStatus === "online" ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
            <BadgeInfo size={20} />
          </button>
          <button
            onClick={() => {
              setSelectedUser(null)
            }}
            className="max-md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-4">
        {messages.map((msg, index) => {
          const fromSelected = isFromSelected(msg)
          return (
            <div key={index} className={`flex items-end gap-3 ${fromSelected ? "justify-start" : "justify-end"}`}>
              {/* Avatar for other (left) */}
              {fromSelected &&
                (selectedUser?.profileImage ? (
                  <img
                    src={selectedUser.profileImage || "/placeholder.svg"}
                    alt="pp"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                    <User size={16} />
                  </div>
                ))}

              {msg.image ? (
                <img src={msg.image || "/placeholder.svg"} alt="attachment" className="max-w-xs rounded-xl shadow-md" />
              ) : (
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${fromSelected ? "bg-white text-slate-900 rounded-bl-none shadow-sm" : "bg-indigo-600 text-white rounded-br-none"}`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              )}

              {/* Avatar for me (right) */}
              {!fromSelected &&
                (user?.profileImage ? (
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt="me"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0" />
                ))}
            </div>
          )
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Send area */}
      <div className="px-6 pb-6 bg-white border-t border-slate-200">
        <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1 pl-4">
          <input
            
            type="text"
            placeholder="Type a message..."
            className="flex-1 text-sm p-2 border-none rounded-full outline-none text-slate-800 placeholder-slate-400 bg-transparent"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image" className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-2">
            <Images size={20} />
          </label>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-3 text-slate-500 bg-slate-50 h-full max-md:hidden">
      <div className="p-4 bg-slate-200 rounded-full">
        <MessageSquareMore size={32} className="text-slate-600" />
      </div>
      <p className="text-lg font-semibold text-slate-700">Select a conversation</p>
      <p className="text-sm text-slate-500">Choose a chat to start messaging</p>
    </div>
  )
}

export default ChatContainer;
