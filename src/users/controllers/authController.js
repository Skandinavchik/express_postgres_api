import dotenv from 'dotenv';
dotenv.config({ path: './config.env' }); 
import pkg from 'jsonwebtoken';
import { Users } from "../models/userModel.js";

const { sign } = pkg;

const signToken = (id) => {
    return sign({ id }, process.env.SECRET);
};

const userSignUp = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        const token = signToken(user.id);

        res.status(201).json({
            status: 'success',
            message: 'User created',
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    };
};

const userSignIn = (req, res) => {
    res.status(200).json({
        data: 'in'
    });
};


export { userSignUp, userSignIn };