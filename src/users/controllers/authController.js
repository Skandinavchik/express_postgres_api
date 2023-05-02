import pkg from 'jsonwebtoken';
import { Users } from "../models/userModel.js";

const { sign } = pkg;

const signToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
};

const userSignUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await Users.create({
            userName,
            email,
            password,
        });

        const token = signToken(user.id);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
        });

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

const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                status: 'failed',
                message: 'Provide email and password',
            });
            return;
        }

        const user = await Users.findOne({ where: { email } });

        if (!user || !(await user.comparePasswords(password, user.password))) {
            res.status(401).json({
                status: 'failed',
                message: 'Invalid email or password',
            });
            return;
        }

        const token = signToken(user.id);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
        });

        res.status(200).json({
            status: 'success',
            message: `Hello, ${user.userName}`
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    };
};


export { userSignUp, userSignIn };