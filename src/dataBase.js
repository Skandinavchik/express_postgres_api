import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { Sequelize } from "sequelize";

const { HOST, DATABASE, USERNAME, PASSWORD, DIALECT } = process.env;
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
});

sequelize.authenticate()
    .then(() => console.log(`===== PostgreSQL connected 🫡  =====`))
    .catch(error => console.error('Unable to connect to the database:', error));


export { sequelize };