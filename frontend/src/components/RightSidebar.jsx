// import React, { useEffect, useState } from "react";
// import { User, LogOut } from 'lucide-react';

// const RightSidebar = ({ selectedUser }) => {
//     const [images, setImages] = useState([]);
//     const handleLogout = () => {
//         console.log('logout');
//     }

//     useEffect(() => {
//         setImages([
//             "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//             "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
//             "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
//             "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
//         ]);
//     }, []);

//     return selectedUser && (
//         <div className={`bg-[#8185B2]/10 text-slate-800 w-full relative overflow-y-auto ${selectedUser ? "max-md:hidden" : ""}`}>
//             <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
//                 {selectedUser ? (
//                     selectedUser?.profileImage
//                         ? <img src={selectedUser.profileImage} alt="" className='w-20 aspect-[1/1] rounded-full' />
//                         : <div className='w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center'><User /></div>
//                 ) : (
//                     <div className="text-sm text-slate-600">No user selected</div>
//                 )}

//                 <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
//                     <span className='w-2 h-2 rounded-full bg-green-500' />
//                     {selectedUser?.name ?? '—'}
//                 </h1>
//                 <p className='px-10 mx-auto text-center text-slate-600'>{selectedUser?.bio ?? ''}</p>
//             </div>

//             <hr className="border-[#ffffff50] my-4" />

//             <div className="px-5 text-s">
//                 <p className="text-slate-700 mb-2">Media</p>
//                 <div className='mt-2 max-h-[300px] overflow-y-auto scrollbar-hide grid grid-cols-2 gap-4 opacity-90'>
//                     {images.map((url, index) => (
//                         <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
//                             <img src={`${url}?w=400&auto=format`} alt="" className='w-full h-24 object-cover rounded-md' />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <button onClick={handleLogout} className='absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-6 rounded-full flex items-center gap-2'>
//                 <LogOut /> LogOut
//             </button>
//         </div>
//     )
// }

// export default RightSidebar;


"use client"

import { useEffect, useState } from "react"
import { User, LogOut, Mail, Phone } from "lucide-react"

const RightSidebar = ({ selectedUser }) => {
  const [images, setImages] = useState([])
  const handleLogout = () => {
    console.log("logout")
  }

  useEffect(() => {
    setImages([
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    ])
  }, [])

  return (
    selectedUser && (
      <div className="bg-white border-l border-slate-200 w-full relative overflow-y-auto flex flex-col max-md:hidden">
        {/* Profile Section */}
        <div className="pt-8 pb-6 px-6 flex flex-col items-center gap-4 border-b border-slate-200">
          {selectedUser ? (
            selectedUser?.profileImage ? (
              <img
                src={selectedUser.profileImage || "/placeholder.svg"}
                alt=""
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white">
                <User size={32} />
              </div>
            )
          ) : null}

          <div className="text-center">
            <h1 className="text-lg font-semibold text-slate-900">{selectedUser?.name ?? "—"}</h1>
            <p className="text-xs text-slate-500 mt-1">
              {selectedUser?.activeStatus === "online" ? "● Active" : "Offline"}
            </p>
          </div>
          <p className="text-sm text-slate-600 text-center">{selectedUser?.bio ?? "No bio added"}</p>
        </div>

        {/* Contact Info */}
        <div className="px-6 py-4 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Contact</p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-slate-700">
              <Mail size={18} className="text-indigo-600" />
              <span className="text-sm">Send Email</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-slate-700">
              <Phone size={18} className="text-indigo-600" />
              <span className="text-sm">Call</span>
            </button>
          </div>
        </div>

        {/* Media Section */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Media</p>
          <div className="grid grid-cols-2 gap-3">
            {images.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img src={`${url}?w=400&auto=format`} alt="" className="w-full h-24 object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 py-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    )
  )
}

export default RightSidebar
