import { handleLogin, handleSignup } from "../controllers/auth.js";
import { getUserDeatils } from "../controllers/user.js";

export const resolvers = {
    Query: {
        getUserDeatils: async (_, { email }) => {
            return await getUserDeatils(email);
        },
    },
    Mutation: {
        login: async (_, { email, password }) => {
            try {
                const result = await handleLogin(email, password);
                return { success: true, token: result.token, user: result.user, message: "Login Successful" };
            } catch (e) {
                return { success: false, message: e.message };
            }
        },
        signup: async (_, { name, email, password }) => {
            try {
                const result = await handleSignup(name, email, password);
                return { success: true, message: "Account Created Successfully." };
            } catch (e) {
                console.log(e);
                return { success: false, message: e.message };
            }
        },
    }
}