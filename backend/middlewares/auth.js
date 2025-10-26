import { validateToken } from '../utlis/token.js';

export const authContext = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth)
        return 'Not Authenticated';
    const token = auth.split(' ')[1];
    try {
        const payload = validateToken(token);
        req.payload = payload;
        next();
        // return payload;
    }
    catch (e) {
        console.log(e);
        throw new Error('Invalid Token');
    }
}

export const getContext = () => {
    return req.payload;
}