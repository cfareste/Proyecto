import User from '../model/user.model.js';
import auth from '../services/auth.service.js';
import eliminate from '../utils/eliminatePhoto.js';

const userModel = new User();

const find = (req, res) => {
    let userID = req.params.ID;
    userModel.getById(userID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar obtener la usuario: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `El usuario con la ID especificada (${userID}) no existe`, ok: false });

        delete result.password;
        res.status(200).send({ userInfo: result, ok: true });
    });
}

const findAll = (req, res) => {
    userModel.getAll((err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a los datos de los usuarios: ${err}`, ok: false });

        return res.status(200).send({ users: result, ok: true });
    })
}

const createUser = (req, res) => {
    let userInfo = JSON.parse(req.body.data);
    let filename = null;

    if (req.file) filename = req.file.filename;
    if (filename) userInfo.imagePath = filename;

    if (!userInfo.name || !userInfo.surnames || !userInfo.email || !userInfo.password || !userInfo.age ) {
        eliminate(`./public/users/${filename}`);
        return res.status(400).send({ message: 'Rellena los campos obligatorios', ok: false });
    }

    userModel.getByEmail(userInfo.email, (err, result) =>{
        if (err) {
            eliminate(`./public/users/${filename}`);
            return res.status(500).send({ message: `Error al intentar registrarse, inténtalo más tarde`, ok: false });
        }
        if (result) {
            eliminate(`./public/users/${filename}`);
            return res.status(400).send({ message: 'Este e-mail ya está registrado', ok: false }); 
        } 

        userModel.insertUser(userInfo, (err, result) => {
            if (err) {
                eliminate(`./public/users/${filename}`);
                return res.status(500).send({ message: `Error al registrarse, inténtalo más tarde`, ok: false });
            }

            userInfo = {
                ID: result,
                ...userInfo
            }

            delete userInfo.password;
            res.status(200).send({ userID: result, token: auth.signJWT(userInfo), ok: true });
        })
    })
}

const login = (req, res) => {
    let userInfo = req.body;

    if (!userInfo.email || !userInfo.password) {
        return res.status(400).send({ message: 'Rellena los campos obligatorios', ok: false });
    }

    userModel.getByEmail(userInfo.email, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar iniciar sesión, inténtalo más tarde`, ok: false });
        if (!result) return res.status(404).send({ message: 'Este e-mail no está registrado', ok: false }); 
        if (userInfo.password != result.password) return res.status(401).send({ message: 'El e-mail y la contraseña no coinciden', ok: false });
    
        delete result.password;
        res.status(200).send({ userID: result.ID, token: auth.signJWT(result), ok: true });
    })
}

const updateUser = async (req, res) => {
    let userID = req.params.ID;
    let userInfo = JSON.parse(req.body.data);
    let filename = null;

    if (req.file) filename = req.file.filename;
    if (filename) userInfo.imagePath = filename;

    if (userInfo.email && userInfo.email !== '') {
        userModel.getByEmail(userInfo.email, (err, result) => {
            if (err) {
                if (filename) eliminate(`./public/users/${filename}`);
                return res.status(500).send({ message: `Error al intentar actualizar el usuario, inténtalo más tarde`, ok: false });
            }

            if (result && result.ID != userID) {
                if (filename) eliminate(`./public/users/${filename}`);
                return res.status(400).send({ message: 'Este e-mail ya está registrado', ok: false }); 
            }

            userModel.updateUser(userID, userInfo, (err, result) => {
                if (err) return res.status(500).send({ message: `Error al intentar actualizar el perfil, inténtalo más tarde`, ok: false });
                res.status(200).send({ affectedRows: result, ok: true });
            })
        })
    } else {
        userModel.updateUser(userID, userInfo, (err, result) => {
            if (err) return res.status(500).send({ message: `Error al intentar actualizar el perfil, inténtalo más tarde`, ok: false });
            res.status(200).send({ affectedRows: result, ok: true });
        })
    }
}

const userController = {
    find,
    findAll,
    createUser,
    login,
    updateUser
}

export default userController;