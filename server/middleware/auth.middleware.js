import auth from '../services/auth.service.js';

const checkAuthorization = (req, res, next) => {
    authenticate (req, res, () => {
        if(req.userInfo.isAdmin) {
            authAdminUser(req, res, next);
        } else {
            authNormalUser(req, res, next);
        }
    })
}

const authenticate = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send({ message: 'Acceso denegado, inicia sesión', ok: false });

    try {
        let decodedToken = auth.verifyJWT(token);
        req.userInfo = decodedToken;
        next();
    } catch (err) {
        return res.status(400).send({ message: 'Tu sesión ha expirado', ok: false });
    }
}

const authNormalUser = (req, res, next) => {
    let userId = req.params.ID || req.params.userID;
    if (userId != req.userInfo.ID) return res.status(403).send({ message: 'Acceso denegado, no tienes permisos para acceder a estos datos', ok: false });
    next();
}

const authAdminUser = (req, res, next) => {
    if (!req.userInfo || !req.userInfo.isAdmin) return res.status(403).send({ message: 'Acceso denegado, se requieren permisos de administrador', ok: false });
    next();
}

const authMiddleware = {
    checkAuthorization,
    authenticate,
    authNormalUser,
    authAdminUser
}

export default authMiddleware;