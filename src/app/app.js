import express from 'express';
import { usersRouter } from '../users/routes/usersRoute.js';


const app = express();

app.use(express.json());

app.use('/api/v1.0/users', usersRouter);


export { app };