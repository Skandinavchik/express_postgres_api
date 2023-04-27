import { Users } from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    await Users.findAll({
        attributes: ['id', 'userName', 'email'],
    })
        .then(users => {
            if (users.length === 0) {
                throw new Error('No users');
            }
            res.status(200).json({
                status: 'success',
                results: users.length,
                users,
            });
        })
        .catch(err => {
            res.status(404).json({
                status: 'failed',
                message: err.message,
            });
        });
};

const getUser = async (req, res) => {
    await Users.findAll({
        attributes: ['id', 'userName', 'email'],
        where: { id: req.params.id },
    })
        .then(user => {
            if (!user) {
                throw new Error(`No user with id: ${id}`);
            }
            res.status(200).json({
                status: 'success',
                user,
            });
        })
        .catch(err => {
            res.status(404).json({
                status: 'failed',
                message: err.message,
            });
        });
};

const createUser = async (req, res) => {
    await Users.create(req.body)
        .then((user) => {
            res.status(201).json({
                status: 'success',
                user,
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.message,
            });
        });
};

const updateUser = async (req, res) => {
    await Users.update(req.body, { where: { id: req.params.id } })
        .then(user => {
            res.status(200).json({
                status: 'success',
                user,
            });
            console.log(user);
        })
        .catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.message,
            });
        });
};

export { getAllUsers, getUser, createUser, updateUser };