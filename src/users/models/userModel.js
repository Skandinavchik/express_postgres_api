import bcrypt from "bcrypt";
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
            len: [0, 40],
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
            len: [0, 40],
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40}$/,
        },
    },
},
{
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(12, 'b');
            user.password = await bcrypt.hash(user.password, salt);
        },
    },
});


export { Users };