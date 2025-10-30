import db from '../db/connectDB.js';
import { io } from '../server.js';

export const getMessagesForUser = async (sender, receiver) => {
    if (!sender || !receiver)
        return { success: false, message: "Users undefined" };
    try {
        const result = await db`
            SELECT * FROM message
            WHERE (sender = ${sender} AND receiver = ${receiver}) OR (receiver = ${sender} AND sender = ${receiver})
            ORDER BY created_at DESC
        `;
        return { success: true, data: result };
    }
    catch (e) {
        return { success: false, message: e.message };
    }
}
export const getUndeliveredMessages = async (receiver) => {
    if (!receiver) return { success: false, message: "Users undefined" };
    try {
        const result = await db`
      SELECT * FROM message
      WHERE receiver = ${receiver} AND message_status = 'undelivered'
      ORDER BY created_at DESC
    `;
        return { success: true, data: result };
    } catch (e) {
        return { success: false, message: e.message };
    }
};

export const sendMessage = async (sender, receiver, text, media, conversationId, userSocketMap) => {
    if (!sender || !receiver) return { success: false, message: "Users undefined" };

    try {
        const [inserted] = await db`
      INSERT INTO message (sender, receiver, body, media, conversation_id, message_status)
      VALUES (${sender}, ${receiver}, ${text}, ${media}, ${conversationId})
      RETURNING *
    `;

        let returned = inserted;

        const receiverSocketId = userSocketMap[receiver];
        if (receiverSocketId) {
            const [updated] = await db`
        UPDATE message
        SET message_status = 'delivered'
        WHERE id = ${inserted.id}
        RETURNING *
      `;
            io.to(receiverSocketId).emit("newMessage", updated);
            returned = updated;
        }

        return { success: true, data: returned };
    } catch (e) {
        return { success: false, message: e.message };
    }
};
