import express from 'express';
import { getAllUsers, getUser, createUser } from '../controllers/usersController.js';


const usersRouter = express.Router();

usersRouter.route('/')
    .get(getAllUsers)
    .post(createUser);

usersRouter.route('/:id')
    .get(getUser);

export { usersRouter };