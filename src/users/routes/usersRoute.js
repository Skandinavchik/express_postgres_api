import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { userSignUp, userSignIn } from '../controllers/authController.js';


const usersRouter = express.Router();

usersRouter.post('/signup', userSignUp);
usersRouter.post('/signin', userSignIn);

usersRouter.route('/')
    .get(getAllUsers);

usersRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

export { usersRouter };