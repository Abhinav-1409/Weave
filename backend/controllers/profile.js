import db from '../db/connectDB.js';
export const handleUpdateBio = async (bio, id) => {
    try {
        if (!id)
            throw new Error('User not Authenticated');
        const result =
            await db`
                UPDATE profile
                SET bio = ${bio}
                WHERE user_id = ${id};
            `
        return { success: true };
    }
    catch (e) {
        console.log(e);
        throw new Error('Some Error Occurred.');
    }
}

export const handleGetUserProfile = async (id) => {
    try {
        if (!id)
            throw new Error('Credentials Required');
        const result =
            await db`
                SELECT * FROM profile
                WHERE user_id = ${id};
            `
        if (result.length == 0) {
            throw new Error('User not found');
        }
        const profile = result[0];
        return profile;
    }
    catch (e) {
        console.log(e);
        throw new Error('Some Error Occurred.');
    }
};

export const handleUpdateLastSeen = async (id) => {
    try {
        if (!id)
            throw new Error('Credentials Required');
        const result =
            await db`
                UPDATE profile
                SET last_seen = ${Date.now()}
                WHERE user_id = ${id};
            `
        return { success: true };
    }
    catch (e) {
        console.log(e);
        throw new Error('Some Error Occurred.');
    }
}