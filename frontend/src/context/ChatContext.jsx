// import React, { useContext, createContext, useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import { useLazyQuery, useMutation } from "@apollo/client/react";
// import { GET_MESSAGES_FOR_SELECTED_USER, GET_USER_WITH_UNSEEN_MESSAGES } from "../graphql/gqlQuery";
// import { SEND_MESSAGE } from "../graphql/gqlMutation";

// export const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {

//     const [getUsersAndMessages, { data }] = useLazyQuery(GET_USER_WITH_UNSEEN_MESSAGES);
//     const [getMessagesForUser, { data: userMessages }] = useLazyQuery(GET_MESSAGES_FOR_SELECTED_USER);
//     const [sendMessageTo, { data: sentMessage }] = useMutation(SEND_MESSAGE);

//     const [messages, setMessages] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [unseenMessages, setUnseenMessages] = useState({});
//     const { socket, token } = useAuth();

//     const getUsers = async () => {
//         try {
//             const res = await getUsersAndMessages({
//                 context: {
//                     headers: {
//                         authorization: `Bearer ${token}`
//                     }
//                 }
//             });
//             if (res.data?.success) {
//                 console.log("getUsersAndMessages", res.data);
//                 const { users, unseenMessages } = res.data;
//                 setUsers(users);
//                 setUnseenMessages(unseenMessages);
//             }
//         }
//         catch (e) {
//             console.log(e);

//         }
//     }

//     const getMessagesForSelectedUser = async () => {
//         try {
//             const res = await getMessagesForUser({
//                 variables: { userId: selectedUser.id }, context: {
//                     headers: {
//                         authorization: `Bearer ${token}`
//                     }
//                 }
//             });
//             console.log(res);
//             if (res.data?.success) {
//                 setMessages(res.data.messages);
//             }
//         } catch (e) {
//             console.log(e.message);
//         }
//     }

//     const sendMessage = async (message, media) => {
//         try {
//             const res = await sendMessageTo({
//                 variables: { receiver: selectedUser.id, text: message, media: media }, context: {
//                     headers: {
//                         authorization: `Bearer ${token}`
//                     }
//                 }
//             });
//             console.log(res);
//         } catch (e) {
//             console.log(e.message);
//         }
//     }

//     const subscribeToMessage = async () => {
//         if (!socket)
//             return;
//         socket.on("newMessage", (newMessage) => {
//             if (selectedUser && newMessage.senderId === selectedUser.id) {
//                 newMessage.seen = true;
//                 setMessages((prev) => [...prev, newMessage]);
//                 //mark messages as seen
//             } else {
//                 setUnseenMessages((prev) => ({
//                     ...prev, [newMessage.senderId]: prev[newMessage.senderId] ? prev[newMessage.senderId] + 1 : 1
//                 }));
//             }
//         })
//     }

//     const unsubscribeFromMessages = () => {
//         if (socket) {
//             socket.off("newMessage")
//         }
//     }

//     useEffect(() => {
//         subscribeToMessage();
//         return () => unsubscribeFromMessages();
//     }, [socket, selectedUser]);

//     return (
//         <ChatContext.Provider value={{
//             messages,
//             setMessages,
//             users,
//             selectedUser,
//             setSelectedUser,
//             unseenMessages,
//             setUnseenMessages,
//             getUsers,
//             sendMessage,
//             getMessagesForSelectedUser
//         }}>
//             {children}
//         </ChatContext.Provider>
//     )
// }

// export const useChat = () => {
//     const context = useContext(ChatContext);
//     return context;
// }
import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_MESSAGES_FOR_SELECTED_USER, GET_USER_WITH_UNSEEN_MESSAGES } from "../graphql/gqlQuery";
import { SEND_MESSAGE } from "../graphql/gqlMutation";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [getUsersAndMessages] = useLazyQuery(GET_USER_WITH_UNSEEN_MESSAGES);
    const [getMessagesForUser] = useLazyQuery(GET_MESSAGES_FOR_SELECTED_USER);
    const [sendMessageTo] = useMutation(SEND_MESSAGE);

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, token } = useAuth();

    const mountedRef = useRef(true);
    const socketHandlerRef = useRef(null);

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; }
    }, []);

    const getUsers = async () => {
        if (!token) return;
        try {
            const res = await getUsersAndMessages({
                context: {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            });
            console.log("getUsers response", res);
            // support common shapes returned by your server
            const usersArr = res?.data?.getUsers ?? res?.data?.users ?? [];
            const unseen = res?.data?.unseenMessages ?? {};
            if (mountedRef.current) {
                setUsers(usersArr);
                setUnseenMessages(unseen);
            }
        } catch (e) {
            if (e?.name === "AbortError") return; // ignore aborts
            console.error("getUsers error:", e);
        }
    };

    const getMessagesForSelectedUser = async () => {
        if (!token || !selectedUser || !selectedUser.id) {
            if (mountedRef.current) setMessages([]);
            return;
        }
        try {
            const res = await getMessagesForUser({
                variables: { userId: selectedUser.id },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            });
            console.log("getMessages response", res);
            const msgs = res?.data?.getMessages ?? res?.data?.messages ?? [];
            if (mountedRef.current) setMessages(msgs);
        } catch (e) {
            if (e?.name === "AbortError") return;
            console.error("getMessages error:", e);
        }
    };

    const sendMessage = async (message, media) => {
        if (!token || !selectedUser || !selectedUser.id) return;
        try {
            const res = await sendMessageTo({
                variables: { receiver: selectedUser.id, text: message, media: media },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            });
            console.log("sendMessage response", res);
            // append returned message if backend provides it
            const sent = res?.data?.sendMessage?.message;
            if (sent && mountedRef.current) setMessages(prev => [...prev, sent]);
        } catch (e) {
            if (e?.name === "AbortError") return;
            console.error("sendMessage error:", e);
        }
    };

    const subscribeToMessage = () => {
        if (!socket) return;
        // remove existing handler
        if (socketHandlerRef.current) {
            socket.off("newMessage", socketHandlerRef.current);
            socketHandlerRef.current = null;
        }
        const handler = (newMessage) => {
            // rule: message is from selected user if senderId === selectedUser.id
            if (selectedUser && newMessage.senderId === selectedUser.id) {
                newMessage.seen = true;
                if (mountedRef.current) setMessages(prev => [...prev, newMessage]);
            } else {
                if (mountedRef.current) {
                    setUnseenMessages(prev => ({
                        ...prev,
                        [newMessage.senderId]: prev[newMessage.senderId] ? prev[newMessage.senderId] + 1 : 1
                    }));
                }
            }
        };
        socketHandlerRef.current = handler;
        socket.on("newMessage", handler);
    };

    const unsubscribeFromMessages = () => {
        if (socket && socketHandlerRef.current) {
            socket.off("newMessage", socketHandlerRef.current);
            socketHandlerRef.current = null;
        }
    };

    useEffect(() => {
        subscribeToMessage();
        return () => unsubscribeFromMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, selectedUser]);

    return (
        <ChatContext.Provider value={{
            messages,
            users,
            selectedUser,
            unseenMessages,
            setSelectedUser,
            getUsers,
            getMessagesForSelectedUser,
            sendMessage
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};
