import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { initDB } from './db/schema.js';

const PORT = process.env.PORT || 8000;

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true,
}));

app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} at ${req.path}`);
    next();
});


const server = new ApolloServer({
    typeDefs: `
        
        type Query {
            checkDB: Boolean
        }
    `,
    resolvers: {
        Query: {
            checkDB: async () => {
                await initDB();
                return true;
            }
        }
    }
});

const startServer = async () => {
    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/`)
    });
}
startServer();