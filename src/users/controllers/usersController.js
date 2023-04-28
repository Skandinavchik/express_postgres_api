import { Users } from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    await Users.findAll({
        attributes: ['id', 'userName', 'email'],
    })
        .then(users => {
            if (users.length === 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'No users',
                });
                return;
            }
            res.status(200).json({
                status: 'success',
                results: users.length,
                users,
            });
        })
        .catch(err => {
            res.status(500).json({
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
            if (user.length === 0) {
                res.status(404).json({
                    status: 'failed',
                    message: `No user with id: ${req.params.id}`,
                });
                return;
            }
            res.status(200).json({
                status: 'success',
                user: user[0],
            });
        })
        .catch(err => {
            res.status(500).json({
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
            res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        });
};

const updateUser = async (req, res) => {
    await Users.update(req.body, { where: { id: req.params.id } })
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'User updated',
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        });
};

const deleteUser = async (req, res) => {
    await Users.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'User deleted',
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        });
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };