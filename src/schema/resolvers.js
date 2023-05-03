import { Users } from "../users/models/userModel.js";

const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await Users.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });

                return users;

            } catch (error) {
                console.log(error);
            }
        },
        user: async (_, args) => {
            try {
                const id = args.id;
                const user = await Users.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                    where: { id },
                });

                return user[0];

            } catch (error) {
                console.log(error);
            }
        }
    },
};

export { resolvers };