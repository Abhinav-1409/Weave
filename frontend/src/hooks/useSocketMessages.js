import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useChatStore } from '../store/chat';

export function useSocketMessages() {
    const { socket, isAuthenticated } = useAuthStore();
    const { selectedUser, addMessage, setUnseenMessages } = useChatStore();

    useEffect(() => {
        if (!socket || !isAuthenticated) return;

        const handler = (newMessage) => {
            console.log("💬 New message:", newMessage);

            if (selectedUser && newMessage.senderId === selectedUser.id) {
                newMessage.seen = true;
                addMessage(newMessage);
            } else {
                setUnseenMessages(newMessage);
            }
        };
        socket.on("newMessage", handler);

        return () => {
            socket.off("newMessage");
        };
    }, [socket, isAuthenticated, selectedUser?.id, addMessage, setUnseenMessages]);
}
