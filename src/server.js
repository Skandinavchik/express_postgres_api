import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { app } from './app/app.js';
import { Server } from "socket.io";
import { sequelize } from './dataBase.js';
import { Users } from './users/models/userModel.js';



const host = process.env.HOST;
const port = process.env.PORT || 8000;

sequelize.sync()
    .then(() => {
        const server = app.listen(port, host, () => {
            console.log(`Server is running on ${host}:${port} 👌`)
        });

        const io = new Server(server, {
            cors: {
                origin: '*'
            }
        });

        io.on('connection', socket => {
            console.log(`Client Connected: ${socket.id} 👂`);
        });
    })
    .catch(err => console.log(err));