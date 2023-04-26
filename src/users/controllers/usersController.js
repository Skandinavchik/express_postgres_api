import { Users } from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();

        if (users.length === 0) {
            throw new Error(`No users`);
        }

        res.status(200).json({
            status: 'success',
            usersCount: users.length,
            users
        });
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error.message
        });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findByPk(id);

        if (!user) {
            throw new Error(`No user with id: ${id}`);
        }

        res.status(200).json({
            status: 'success',
            user,
        });
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error.message
        });
    }
};

const createUser = (req, res) => {
    Users.create(req.body)
        .then((user) => {
            res.status(201).json({
                status: 'success',
                user
            });
        })
        .catch(err => {
            res.status(401).json({
                status: 'failed',
                message: err.message
            });
        });

};

export { getAllUsers, getUser, createUser };