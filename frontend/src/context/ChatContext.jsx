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

import React, { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_MESSAGES_FOR_SELECTED_USER, GET_USER_WITH_UNSEEN_MESSAGES } from "../graphql/gqlQuery";
import { SEND_MESSAGE } from "../graphql/gqlMutation";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [getUsersAndMessages, { data }] = useLazyQuery(GET_USER_WITH_UNSEEN_MESSAGES);
    const [getMessagesForUser, { data: userMessages }] = useLazyQuery(GET_MESSAGES_FOR_SELECTED_USER);
    const [sendMessageTo, { data: sentMessage }] = useMutation(SEND_MESSAGE);

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, token } = useAuth();

    const getUsers = async () => {
        try {
            const res = await getUsersAndMessages({
                context: {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            }); // ✅ Fixed: Added closing ) and }

            if (res.data?.success) {
                console.log("getUsersAndMessages", res.data);
                const { users, unseenMessages } = res.data;
                setUsers(users);
                setUnseenMessages(unseenMessages);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getMessagesForSelectedUser = async () => {
        try {
            const res = await getMessagesForUser({
                variables: { userId: selectedUser.id },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            }); // ✅ Fixed: Added closing ) and }

            console.log(res);
            if (res.data?.success) {
                setMessages(res.data.messages);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const sendMessage = async (message, media) => {
        try {
            const res = await sendMessageTo({
                variables: { receiver: selectedUser.id, text: message, media: media },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            }); // ✅ Fixed: Added closing ) and }

            console.log(res);
        } catch (e) {
            console.log(e.message);
        }
    };

    const subscribeToMessage = () => { // ✅ Fixed: Removed async (not needed)
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser.id) {
                newMessage.seen = true;
                setMessages((prev) => [...prev, newMessage]);
                //mark messages as seen
            } else {
                setUnseenMessages((prev) => ({
                    ...prev,
                    [newMessage.senderId]: prev[newMessage.senderId] ? prev[newMessage.senderId] + 1 : 1
                }));
            }
        }); // ✅ Fixed: Added closing )
    };

    const unsubscribeFromMessages = () => {
        if (socket) {
            socket.off("newMessage");
        }
    };

    useEffect(() => {
        subscribeToMessage();
        return () => unsubscribeFromMessages();
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
    const context = useContext(ChatContext);
    return context;
};
