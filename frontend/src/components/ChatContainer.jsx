// // import React, { useState, useEffect, useRef } from "react";
// // import { BadgeInfo, User, X, MessageSquareMore, Images, Send } from 'lucide-react'

// // const ChatContainer = ({ selectedUser, setSelectedUser }) => {
// //     const scrollEnd = useRef();
// //     const [user, setUser] = useState([]);
// //     const [messages, setMessages] = useState([]);
// //     useEffect(() => {
// //         setUser({ 'profileImage': null, 'name': "Abhinav", 'activeStatus': 'online', '_id': 1, });
// //         setMessages([{
// //             'text': "Hello I'm sender",
// //             'senderId': 2,
// //             'createdAt': Date.now(),
// //         }, {
// //             'text': "Hello I'm receiver",
// //             'senderId': 1,
// //             'createdAt': Date.now(),
// //         }, {
// //             // 'text': "Hello I'm sender",
// //             'image': 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
// //             'senderId': 2,
// //             'createdAt': Date.now(),
// //         }]);
// //     }, []);
// //     useEffect(() => {
// //         if (scrollEnd.current) {
// //             scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
// //         }
// //     }, []);
// //     return selectedUser ? (
// //         <div>
// //             {/*  Header */}
// //             <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
// //                 {user?.profileImage ? <img src={user?.profileImage} className="w-8 rounded-full" /> : <User />}
// //                 <p className="flex-1 text-lg text-white flex items-center gap-2">
// //                     {user?.name}
// //                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
// //                 </p>
// //                 <button onClick={() => { setSelectedUser(null) }} className="max-md:hidden max-w-5"> <X /> </button>
// //                 <button onClick={() => { console.log('help') }} className="max-md:hidden max-w-5"> <BadgeInfo /> </button>
// //             </div>
// //             {/*  Chat */}
// //             <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll scrollbar-hide p-3 pb-6">
// //                 {messages.map((msg, index) => (
// //                     <div key={index} className={`flex items-end gap-2 justify-end ${msg?.senderId !== selectedUser._id && 'flex-row-reverse'}`}>
// //                         {msg.image ? (<img src={msg?.image} className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8" />)
// //                             : (
// //                                 <p className={`p-2 max-w-[200px] md:text-sm-font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === selectedUser._id ? 'rounded-br-none' : 'rounded-bl-none'} `} >{msg.text}</p>
// //                             )}
// //                         <div className="text-center text-xs">
// //                             {msg.senderId === selectedUser._id && (selectedUser?.profileImage ? <img src={selectedUser.profileImage} alt="pp" className="w-7 rounded-full" /> : <User />)}
// //                             {msg.senderId !== selectedUser._id && <div className="w-7 h-7 rounded-full bg-gray-600" />}
// //                         </div>
// //                         <p>{new Date(msg?.createdAt).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
// //                     </div>
// //                 ))}
// //                 <div ref={scrollEnd}></div>
// //                 {/* send messages */}
// //                 <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
// //                     <input type="text" placeholder="Send a message..." className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400" />
// //                     <input type="file" id='image' accept="image/png, inage/jpeg" hidden />
// //                     <label htmlFor="image" className="cursor-pointer w-5 mr-2"> <Images /></label>
// //                 </div>
// //                 <button className="w-7 cursor-pointer"> <Send /></button>
// //             </div>
// //         </div>
// //     ) : (
// //         <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
// //             <MessageSquareMore />
// //             <p className="text-lg font-medium text-white">Chat Anytime, Anywhere</p>
// //         </div>
// //     )
// // }

// // export default ChatContainer;
// import React, { useState, useEffect, useRef } from "react";
// import { BadgeInfo, User, X, MessageSquareMore, Images, Send } from 'lucide-react'

// const ChatContainer = ({ selectedUser, setSelectedUser }) => {
//     const scrollEnd = useRef();
//     const [user] = useState({ profileImage: null, name: "You", activeStatus: 'online', _id: 1 });
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         setMessages([{
//             text: "Hello I'm sender",
//             senderId: 2,
//             createdAt: Date.now(),
//         }, {
//             text: "Hello I'm receiver",
//             senderId: 1,
//             createdAt: Date.now(),
//         }, {
//             image: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
//             senderId: 2,
//             createdAt: Date.now(),
//         }]);
//     }, []);

//     // scroll when messages or selected user change
//     useEffect(() => {
//         if (scrollEnd.current) scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
//     }, [messages, selectedUser]);

//     // simple rule: message is from selected user if senderId === selectedUser._id
//     const isFromSelected = (msg) => selectedUser && msg.senderId === selectedUser._id;

//     return selectedUser ? (
//         <div className="flex flex-col h-full bg-slate-50">
//             {/* Header */}
//             <div className="flex items-center gap-3 py-3 px-4 border-b border-slate-200 bg-white/50">
//                 {selectedUser?.profileImage ? <img src={selectedUser.profileImage} className="w-8 rounded-full" alt="pp" /> : <User />}
//                 <p className="flex-1 text-lg text-slate-800 flex items-center gap-2">
//                     {selectedUser?.name}
//                     <span className={`w-2 h-2 rounded-full ${selectedUser?.activeStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
//                 </p>
//                 <button onClick={() => { setSelectedUser(null) }} className="max-md:hidden"> <X /> </button>
//                 <button onClick={() => { console.log('help') }} className="max-md:hidden"> <BadgeInfo /> </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
//                 {messages.map((msg, index) => {
//                     const fromSelected = isFromSelected(msg);
//                     return (
//                         <div key={index} className={`flex items-end gap-3 mb-4 ${fromSelected ? 'justify-start' : 'justify-end'}`}>
//                             {/* avatar for other (left) */}
//                             {fromSelected && (
//                                 selectedUser?.profileImage
//                                     ? <img src={selectedUser.profileImage} alt="pp" className="w-8 h-8 rounded-full" />
//                                     : <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white"><User /></div>
//                             )}

//                             {msg.image ? (
//                                 <img src={msg.image} alt="attachment" className={`max-w-[260px] rounded-lg border ${fromSelected ? '' : 'order-2'}`} />
//                             ) : (
//                                 <div className={`p-3 max-w-[60%] break-words rounded-lg ${fromSelected ? 'bg-white text-slate-900 rounded-bl-none' : 'bg-indigo-600 text-white rounded-br-none'} shadow-sm`}>
//                                     <div className="text-sm">{msg.text}</div>
//                                 </div>
//                             )}

//                             {/* avatar for me (right) */}
//                             {!fromSelected && (
//                                 user?.profileImage
//                                     ? <img src={user.profileImage} alt="me" className="w-8 h-8 rounded-full" />
//                                     : <div className="w-8 h-8 rounded-full bg-slate-400" />
//                             )}

//                             <div className="text-xs text-slate-400 ml-2">
//                                 {new Date(msg?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                             </div>
//                         </div>
//                     )
//                 })}
//                 <div ref={scrollEnd}></div>
//             </div>

//             {/* Send area */}
//             <div className="px-4 pb-4">
//                 <div className="flex items-center gap-3 bg-white/60 rounded-lg p-3">
//                     <input
//                         type="text"
//                         placeholder="Send a message..."
//                         className="flex-1 text-sm p-2 border-none rounded-md outline-none text-slate-800 placeholder-slate-400 bg-transparent"
//                     />
//                     <input type="file" id='image' accept="image/png, image/jpeg" hidden />
//                     <label htmlFor="image" className="cursor-pointer text-slate-600"><Images /></label>
//                     <button className="ml-1 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md">
//                         <Send />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     ) : (
//         <div className="flex flex-col items-center justify-center gap-2 text-slate-500 bg-slate-50 h-full">
//             <MessageSquareMore />
//             <p className="text-lg font-medium text-slate-700">Chat Anytime, Anywhere</p>
//         </div>
//     )
// }

// export default ChatContainer;


"use client"

import { useState, useEffect, useRef } from "react"
import { BadgeInfo, User, X, MessageSquareMore, Images, Send } from "lucide-react"

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef()
  const [user] = useState({ profileImage: null, name: "You", activeStatus: "online", _id: 1 })
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        text: "Hey! How are you doing?",
        senderId: 2,
        createdAt: Date.now(),
      },
      {
        text: "I'm doing great! Just finished the project.",
        senderId: 1,
        createdAt: Date.now(),
      },
      {
        image:
          "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
        senderId: 2,
        createdAt: Date.now(),
      },
    ])
  }, [])

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
