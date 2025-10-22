// import React, { useState } from "react";
// import Sidebar from '../components/Sidebar';
// import ChatContainer from '../components/ChatContainer';
// import RightSidebar from '../components/RightSidebar';

// const HomePage = () => {
//     const [selectedUser, setSelectedUser] = useState(false);

//     return (
//         <div className="w-full h-screen bg-slate-100 p-4">
//             <div className={`h-full rounded-2xl overflow-hidden bg-white shadow-md grid grid-cols-1 relative p-3 ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
//                 <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
//                 <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
//                 <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
//             </div>
//         </div>
//     )
// }

// export default HomePage;

"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import ChatContainer from "../components/ChatContainer"
import RightSidebar from "../components/RightSidebar"
import AuthPage from './AuthPage'
import ProfilePage from "./ProfilePage"

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false)

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-4">
      <div
        className={`h-full rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-200/50 grid grid-cols-1 relative ${selectedUser ? "md:grid-cols-[280px_1fr_320px] lg:grid-cols-[300px_1.5fr_340px]" : "md:grid-cols-[280px_1fr]"}`}
      >
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default HomePage
