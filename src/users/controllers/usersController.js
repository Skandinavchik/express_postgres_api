import { Users } from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'userName', 'email', 'password'],
        });

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
            data: {
                users,
            },
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    };
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findAll({
            attributes: ['id', 'userName', 'email'],
            where: { id },
        });

        if (user.length === 0) {
            res.status(404).json({
                status: 'failed',
                message: `No user with id: ${req.params.id}`,
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: user[0],
            },
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    };
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.update(req.body, { where: { id } });

        res.status(200).json({
            status: 'success',
            message: 'User updated',
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    };
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.destroy({ where: { id } });

        res.status(200).json({
            status: 'success',
            message: 'User deleted',
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    };
};

export { getAllUsers, getUser, updateUser, deleteUser };