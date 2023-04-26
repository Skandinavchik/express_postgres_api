import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { Sequelize } from "sequelize";


const sequelize = new Sequelize(process.env.DATABASE);

sequelize.authenticate()
    .then(() => console.log('PostgreSQL connected 🫡'))
    .catch(error => console.error('Unable to connect to the database:', error));


export { sequelize };