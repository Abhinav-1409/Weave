import { validateToken } from '../utlis/token.js';

export const authContext = ({ req, res, next }) => {
    const auth = req.headers['authorization'];
    if (!auth)
        return { success: false, message: 'Not Authenticated' };
    const token = auth.split(' ')[1] || ' ';
    try {
        const payload = validateToken(token);
        req.payload = payload;
        return { authenticated: true, user: payload };
    }
    catch (e) {
        console.log(e);
        return { authenticated: false, message: e.message };
    }
}