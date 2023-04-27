import { DataTypes } from "sequelize";
import { sequelize } from '../../dataBase.js';

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        unique: {
            msg: 'This username already exists.',
        },
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Username must be provided instead of empty string.',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: {
            msg: 'This email already exists.',
        },
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Invalid email.',
            },
        },
    },
});

export { Users };