import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useChatStore } from '../store/chat';

export function useSocketMessages() {
    const { socket, isAuthenticated } = useAuthStore();
    const { selectedUser, addMessage, setUnseenMessages } = useChatStore();

    useEffect(() => {
        if (!socket || !isAuthenticated) return;

        const newHandler = (newMessage) => {
            console.log("💬 New message:", newMessage);

            if (selectedUser && newMessage.senderId === selectedUser.id) {
                newMessage.seen = true;
                addMessage(newMessage);
            } else {
                setUnseenMessages(newMessage);
            }
        };
        const updateHandler = ({ fakeId, message }) => {
            console.log("💬 Update message:", message);
            if (message) {
                useChatStore.getState().updateMessage(fakeId, message);
            }
        }
        socket.on("newMessage", newHandler);
        socket.on("updateMessage", updateHandler);
        return () => {
            socket.off("newMessage");
        };
    }, [socket, isAuthenticated, selectedUser?.id, addMessage, setUnseenMessages]);
}
