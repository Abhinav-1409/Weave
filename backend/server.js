import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { Server, Socket } from "socket.io";

import { createServer } from "http";

import { typeDefs } from './graphql/typedef.js';
import { resolvers } from './graphql/resolvers.js';

const PORT = process.env.PORT || 8000;

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { authContext } from './middlewares/auth.js';

const app = express();
const httpServer = createServer(app);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));










export const io = new Server(httpServer, {
    cors: { origin: "*" }
});

export const userSocketMap = {}; // {userId: socketId }

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    if (userId)
        userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});










app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} at ${req.path}`);
    next();
});


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = async () => {
    await server.start();

    app.use('/graphql', expressMiddleware(server, {
        context: authContext
    }));

    app.get('/', (req, res) => {
        res.send('server up and running');
    });

    // app.listen(PORT, () => {
    //     console.log(`http://localhost:${PORT}/`)
    // });
     httpServer.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
        console.log(`Socket.IO ready on ws://localhost:${PORT}`);
    });
}
startServer();