import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const signJWT = payload => {
    return jwt.sign(payload, config.AUTH_SECRET_KEY, { expiresIn: config.AUTH_KEY_EXPIRATION });
}

const verifyJWT = token => {
    return jwt.verify(token, config.AUTH_SECRET_KEY);
}

const auth = {
    signJWT,
    verifyJWT
}

export default auth;