import Course from "../model/course.model.js";

const courseModel = new Course();

const find = (req, res) => {
    let courseID = req.params.ID;
    courseModel.getById(courseID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar obtener la información del curso: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `El curso con la ID especificada (${courseID}) no existe`, ok: false });

        res.status(200).send({ courseInfo: result, ok: true });
    })
}

const findAll = (req, res) => {
    let courseYear = req.params.year;
    courseModel.getAll(courseYear, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a los cursos: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `Los cursos del año especificado (${year}) no existen`, ok: false });

        return res.status(200).send({ courses: result, ok: true });
    })
}

const courseController = {
    find,
    findAll
}

export default courseController;