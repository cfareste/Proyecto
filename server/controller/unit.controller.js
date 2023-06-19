import Unit from "../model/unit.model.js";

const unitModel = new Unit();

const find = (req, res) => {
    let unitID = req.params.ID;
    unitModel.getById(unitID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar obtener la información de la unidad: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `La unidad con la ID especificada (${unitID}) no existe`, ok: false });

        res.status(200).send({ unitInfo: result, ok: true });
    })
}

const findByCourseId = (req, res) => {
    let courseID = req.params.courseID;
    unitModel.getByCourseId(courseID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a las unidades: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `Las unidades pertenecientes al curso con la ID especificada (${courseID}) no existen`, ok: false });

        res.status(200).send({ units: result, ok: true })
    })
}

const unitController = {
    find,
    findByCourseId
}

export default unitController;