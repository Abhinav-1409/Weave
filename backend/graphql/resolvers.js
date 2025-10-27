import { handleLogin, handleSignup } from "../controllers/auth.js";
import { handleGetUserDetails, handleUpdateUserName, handleGetUserFriends, handleGetUsers } from "../controllers/user.js";
import { handleUpdateBio, handleGetUserProfile } from '../controllers/profile.js';
import { getObjectUrl, getUploadUrl } from '../utlis/s3.js';
import camelcaseKeys from 'camelcase-keys';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        getUserDeatils: async (_, { email }, context) => {
            return camelcaseKeys(await handleGetUserDetails({ email: email, id: null }));
        },
        getAllUsers: async (_, args, context) => {
            console.log(context);
            if (!context.authenticated) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return camelcaseKeys(await handleGetUsers());
        }
    },
    User: {
        profile: async (parent) => {
            return camelcaseKeys(await handleGetUserProfile(parent.id));
        },
        friend: async (parent) => {
            const friends = camelcaseKeys(await handleGetUserFriends(parent.id));
            return friends;
        }
    },
    Friend: {
        user: async (parent) => {
            return camelcaseKeys(await handleGetUserDetails({ id: parent.friends }));
        }
    },
    Profile: {
        user: async (parent) => {
            return camelcaseKeys(await handleGetUserDetails({ id: parent.userId }));
        }
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
        updateProfile: async (_, { bio, name }) => {
            if (name) {
                handleUpdateUserName(name, '9ac6ff1b-5239-42b5-a869-5c85e7b68bd4');
            }
            if (bio) {
                handleUpdateBio(bio, '9ac6ff1b-5239-42b5-a869-5c85e7b68bd4');
            }
            const profile = camelcaseKeys(await handleGetUserProfile("9ac6ff1b-5239-42b5-a869-5c85e7b68bd4"));
            return profile;
        },
        updateProfileImage: async (_, { contentType }) => {
            const uploadUrl = await getObjectUrl('rtyu');
            return uploadUrl;
        }
    }
}