import { Users } from "../users/models/userModel.js";

const resolvers = {
    Query: {
        async users() {
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
        }
    },
};

export { resolvers };