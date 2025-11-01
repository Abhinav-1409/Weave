import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import ChatContainer from "../components/ChatContainer"
import RightSidebar from "../components/RightSidebar"

import { useAuthStore } from "../store/auth"
import { useChatStore } from "../store/chat"
import { useSocketMessages } from "../hooks/useSocketMessages"

const HomePage = () => {
  useSocketMessages();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated)
      navigate('/auth');
  }, [isAuthenticated, navigate])
  const { selectedUser } = useChatStore();


  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <div className="w-80 max-md:w-full flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-full overflow-hidden">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatContainer />
      </div>

      {selectedUser && <div className="w-80 border-l border-slate-200 bg-white flex-shrink-0 max-lg:hidden">
        <RightSidebar />
      </div>}
    </div>
  );
}

export default HomePage
