import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { usersRouter } from '../users/routes/usersRoute.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use('/api/v1.0/users', usersRouter);


export { app };