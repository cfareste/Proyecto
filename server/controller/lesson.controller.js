import Course from "../model/course.model.js";
import Lesson from "../model/lesson.model.js";
import Unit from '../model/unit.model.js';

const lessonModel = new Lesson();
const courseModel = new Course();
const unitModel = new Unit();

const find = (req, res) => {
    let lessonID = req.params.ID;
    lessonModel.getById(lessonID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar obtener la información de la lección: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `La lección con la ID especificada (${lessonID}) no existe`, ok: false });

        const lessonInfo = result;
        unitModel.getById(lessonInfo.unitID, (err, result) => {
            if (err) return res.status(500).send({ message: `Error al intentar obtener la información de la unidad: ${err}`, ok: false });
            if (!result) return res.status(404).send({ message: `La unidad con la ID especificada (${lessonInfo.unitID}) no existe`, ok: false });

            const unitInfo = result;
            const lessonResult = {
                ...lessonInfo,
                courseID: unitInfo.courseID
            }

            return res.status(200).send({ lessonInfo: lessonResult, ok: true });
        })
    })
}

const findRelation = (req, res) => {
    let lessonID = req.params.lessonID;
    let userID = req.params.userID;

    lessonModel.getUserRelation(userID, lessonID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar obtener la información de la lección iniciada: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `La lección con la ID especificada (${lessonID}) no ha sido iniciada por el usuario (${userID})`, ok: false });

        return res.status(200).send({ lessonUserRelation: result, ok: true })
    })
}

const findByUnitId = (req, res) => {
    let unitID = req.params.unitID;
    lessonModel.getByUnitId(unitID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a las lecciones: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `Las lecciones de la unidad con la ID especificada (${unitID}) no existe`, ok: false });

        return res.status(200).send({ lessons: result, ok: true })
    });
}

const findBySearch = (req, res) => {
    let search = req.params.title;
    lessonModel.getByTitle(search, (err, lessonsResult) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a las lecciones: ${err}`, ok: false });
        if (!lessonsResult) return res.status(404).send({ message: `Las lecciones con el título especificado (${search}) no existen`, ok: false });

        let lessons = lessonsResult;
        courseModel.getAllTitlesBySearch(search, (err, courseTitleResults) => {
            if (err) return res.status(500).send({ message: `Error al intentar acceder a los títulos de los cursos: ${err}`, ok: false });

            let courseTitles = courseTitleResults;
            let searchedLessons = Object.keys(lessons).reduce((lastObj, key, idx) => {
                return {
                    ...lastObj,
                    [key]: {
                        ...lessons[key],
                        courseID: courseTitles[idx].ID,
                        courseTitle: courseTitles[idx].title
                    }
                }
            }, {});

            return res.status(200).send({ lessons: searchedLessons, ok: true });
        })
    })
}

const findAllStartedByUserId = (req, res) => {
    let year = req.params.year;
    let userID = req.params.userID;
    lessonModel.getStartedLessons(year, userID, (err, lessonsResult) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a las lecciones comenzadas: ${err}`, ok: false });
        if (!lessonsResult) return res.status(404).send({ message: `Las lecciones con el año especificado (${year}) no han sido iniciadas por el usuario (${userID})`, ok: false });

        let lessons = lessonsResult;
        courseModel.getAllTitlesRelatedToStartedLessons(year, userID, (err, courseTitleResults) => {
            if (err) return res.status(500).send({ message: `Error al intentar acceder a los títulos de los cursos: ${err}`, ok: false });

            let courseInfo = courseTitleResults;
            let startedLessons = Object.keys(lessons).reduce((lastObj, key, idx) => {
                return {
                    ...lastObj,
                    [key]: {
                        ...lessons[key],
                        courseID: courseInfo[idx].ID,
                        courseTitle: courseInfo[idx].title
                    }
                }
            }, {});

            return res.status(200).send({ lessons: startedLessons, ok: true });
        })
    })
}

const createRelationWithUser = (req, res) => {
    const userID = req.params.userID;
    const lessonID = req.params.lessonID;

    lessonModel.getUserRelation(userID, lessonID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a los ejercicios comenzados: ${err}`, ok: false });
        if (result) return res.status(400).send({ message: 'El usuario ya comenzó esta lección', ok: false });

        lessonModel.insertUserLessonRelation(userID, lessonID, (err, result) => {
            if (err) return res.status(500).send({ message: `Error al crear la relación entre usuario y lección: ${err}`, ok: false });

            return res.status(200).send({ relationID: result, ok: true })
        })
    })
}

const updateRelationWithUser = (req, res) => {
    let userID = req.params.userID;
    let lessonID = req.params.lessonID;
    let newValues = req.body;
    
    lessonModel.updateUserLessonRelation(userID, lessonID, newValues, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar actualizar la lección: ${err}`, ok: false });
        return res.status(200).send({ affectedRows: result, ok: true });
    })
}

const restartRelationWithUser = (req, res) => {
    let userID = req.params.userID;
    let lessonID = req.params.lessonID;
    let newValues = { progress: 0 };

    lessonModel.updateUserLessonRelation(userID, lessonID, newValues, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar actualizar la lección: ${err}`, ok: false });
        return res.status(200).send({ affectedRows: result, ok: true });
    })
}

const lessonController = {
    find,
    findRelation,
    findByUnitId,
    findAllStartedByUserId,
    findBySearch,
    createRelationWithUser,
    updateRelationWithUser,
    restartRelationWithUser
}

export default lessonController;