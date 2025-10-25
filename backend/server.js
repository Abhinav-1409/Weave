import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { typeDefs } from './graphql/typedef.js';
import { resolvers } from './graphql/resolvers.js';

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
    typeDefs,
    resolvers
});

const startServer = async () => {
    await server.start();

    app.use('/graphql', expressMiddleware(server));
    app.get('/', (req, res) => {
        res.send('server up and running');
    });

    app.get('/url', async (req,res)=>{
        res.send('await init()');
    });

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/`)
    });
}
startServer();