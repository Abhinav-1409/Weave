import db from "../db/connectDB.js";

export const handleGetUserDetails = async ({ email = null, id = null }) => {
    try {
        if (!email && !id)
            throw new Error('Credentials Required');

        let result;
        if (email)
            result =
                await db`
                SELECT * FROM users
                WHERE email = ${email};
            `
        else if (id)
            result =
                await db`
                SELECT * FROM users
                WHERE id = ${id};
            `
        if (result.length == 0) {
            throw new Error('User not found');
        }
        const user = result[0];
        return user;
    }
    catch (e) {
        console.log(e);
        throw new Error('Some Error Occurred.');
    }
}

export const handleUpdateUserName = async (name, id) => {
    try {
        if (!id)
            throw new Error('Credentials Required');
        const result =
            await db`
                UPDATE users
                SET name = ${name}
                WHERE id = ${id};
            `
        return { success: true };
    }
    catch (e) {
        console.log(e);
        throw new Error('Some Error Occurred.');
    }
}

export const handleGetUserFriends = async (id) => {
    try {
        if (!id)
            throw new Error('Credentials Required');
        const result =
            await db`
                SELECT * FROM friend
                WHERE user1 = ${id} OR user2 = ${id};
            `
        return result;
    } catch (e) {
        console.log(e);
        throw new Error('Some Error Occurred.');
    }
}