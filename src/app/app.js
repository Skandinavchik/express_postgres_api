import express from 'express';
import cookieParser from 'cookie-parser';
import { usersRouter } from '../users/routes/usersRoute.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1.0/users', usersRouter);


export { app };