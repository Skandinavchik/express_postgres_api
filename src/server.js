import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { app } from './app/app.js';
import { sequelize } from './dataBase.js';
import { Users } from './users/models/userModel.js';



const host = process.env.HOST;
const port = process.env.PORT || 8000;

sequelize.sync({ force: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Server is running on ${host}:${port} 👌`)
        });
    })
    .catch(err => console.log(err));