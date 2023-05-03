import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers } from './schema/resolvers.js';
import { typeDefs } from './schema/typeDefs.js';
import { Server } from "socket.io";
import { sequelize } from './dataBase.js';
import { Users } from './users/models/userModel.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


const host = process.env.HOST;
const port = process.env.PORT || 8000;

sequelize.sync()
    .then(() => {
        const server = app.listen(port, host, () => {
            console.log(`===== Server is running on ${host}:${port} 👌 =====`)
        });

        const apollo = new ApolloServer({
            typeDefs,
            resolvers,
        });

        apollo.start()
            .then(() => {
                app.use('/graphql', expressMiddleware(apollo));
                console.log(`===== Apollo is running too 🚀 =====`);
            })
            .catch(err => console.log(err));

        const io = new Server(server, {
            cors: {
                origin: '*'
            }
        });

        io.on('connection', socket => {
            console.log(`Client Connected: ${socket.id} 👂`);



            socket.on('disconnect', () => {
                console.log(`Disconnected: ${socket.id} 🫣`);
            });
        });
    })
    .catch(err => console.log(err));