import db from "../db/connectDB.js";

export const getUserDeatils = async (email) => {
    try {
        if (!email)
            throw new Error('Credentials Required');
        const result =
            await db`
                SELECT * FROM users
                WHERE email = ${email};
            `
        if(result.length == 0){
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