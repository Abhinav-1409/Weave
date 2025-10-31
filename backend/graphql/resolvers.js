import { handleLogin, handleSignup } from "../controllers/auth.js";
import { handleGetUserDetails, handleUpdateUserName, handleGetUserFriends, handleGetUsers } from "../controllers/user.js";
import { handleUpdateBio, handleGetUserProfile } from '../controllers/profile.js';
import { getObjectUrl, getUploadUrl } from '../utlis/s3.js';
import camelcaseKeys from 'camelcase-keys';
import { GraphQLError } from 'graphql';
import { getMessagesForUser, getUndeliveredMessages, sendMessage } from "../controllers/message.js";
import { userSocketMap } from "../server.js";

export const resolvers = {
    Query: {
        getUserDeatils: async (_, { id }) => {
            if (!context.isAuthenticated) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return camelcaseKeys(await handleGetUserDetails({ email: null, id: id }), { deep: true });
        },
        getUsers: async (_, args, context) => {
            if (!context.isAuthenticated) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return camelcaseKeys(await handleGetUsers(context.user.id), { deep: true });
        },
        getMessagesForUser: async (_, { userId }, context) => {
            if (!context.isAuthenticated) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const result = await getMessagesForUser(userId, context.user.id);
            return camelcaseKeys(result.data, { deep: true });
        }
    },
    User: {
        profile: async (parent) => {
            return camelcaseKeys(await handleGetUserProfile(parent.id), { deep: true });
        },
        unseenMessages: async (parent, { }, context) => {
            const result = camelcaseKeys((await getUndeliveredMessages(parent.id, context.user.id), { deep: true }));
            return result.data;
        }
    },
    Profile: {
        user: async (parent) => {
            return camelcaseKeys(await handleGetUserDetails({ id: parent.userId }), { deep: true });
        }
    },
    Mutation: {
        login: async (_, { email, password }) => {
            try {
                const result = await handleLogin(email, password);
                return { success: true, token: result.token, user: result.user, message: "Login Successful" };
            } catch (e) {
                return { success: false, error: e.message };
            }
        },
        signup: async (_, { name, email, password }) => {
            try {
                const result = await handleSignup(name, email, password);
                return { success: true, message: "Account Created Successfully." };
            } catch (e) {
                console.log(e);
                return { success: false, error: e.message };
            }
        },
        updateProfile: async (_, { bio, name }, context) => {
            if (!context.isAuthenticated) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (name) {
                handleUpdateUserName(name, context.user.id);
            }
            if (bio) {
                handleUpdateBio(bio, context.user.id);
            }
            const profile = camelcaseKeys(await handleGetUserProfile(context.user.id), { deep: true });
            return profile;
        },
        getUploadUrl: async (_, { path, contentType }, context) => {
            if (!context.isAuthenticated) {
                throw new GraphQLError("You are not authorized to perform this acction."),
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    }
                }
            }
            const uploadUrl = await getUploadUrl(path, context.user.id, contentType);
            return uploadUrl.url;
        },
        sendMessages: async (_, { receiverId, text, image }, context) => {
            if (!context.isAuthenticated) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            try {
                const res = await sendMessage(context.user.id, receiverId, text, image, userSocketMap);
                return camelcaseKeys(res.data, { deep: true });
            } catch (e) {
                throw new GraphQLError(e.message, {
                    extensions: {
                        code: 'ERROR',
                    },
                });
            }
        }
    }
}