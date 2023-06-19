import Streak from "../model/streak.module.js";

const streakModel = new Streak();

const getByUserID = (req, res) => {
    let userID = req.params.userID;
    streakModel.getByUserID(userID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar obtener la racha de usuario: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `La racha del usuario con la ID especificada (${userID}) no existe`, ok: false });

        res.status(200).send({ streakInfo: result, ok: true });
    })
}

const create = (req, res) => {
    let userID = req.params.userID;
    streakModel.getByUserID(userID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al crear la racha: ${err}`, ok: false });
        if (result) return res.status(400).send({ message: 'Este usuario ya tiene una racha', ok: false }); 
        
        streakModel.insertStreak(userID, (err, result) => {
            if (err) return res.status(500).send({ message: `Error al crear la racha: ${err}`, ok: false });

            res.status(200).send({ streakID: result, ok: true });
        })
    });
}

const update = (req, res) => {
    let userID = req.params.userID;
    let streakInfo = req.body;

    streakModel.update(userID, streakInfo, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar actualizar la racha: ${err}`, ok: false });
        res.status(200).send({ affectedRows: result, ok: true });
    })
}

const streakController = {
    getByUserID,
    create, 
    update,
}

export default streakController;