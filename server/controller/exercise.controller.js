import Exercise from "../model/exercise.model.js";

const exerciseModel = new Exercise();

const find = (req, res) => {
    let exerciseID = req.params.ID;
    exerciseModel.getById(exerciseID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar obtener la información del ejercicio: ${err}`, ok: false });
        if (!result) return res.status(404).send({ message: `El ejercicio con la ID especificada (${exerciseID}) no existe`, ok: false });

        return res.status(200).send({ exerciseInfo: result, ok: true });
    })
}

const findExercisesRelatedToUserAndOneLesson = (req, res) => {
    let userID = req.params.userID;
    let lessonID = req.params.lessonID;
    exerciseModel.getByLessonId(lessonID, (err, results) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a los ejercicios: ${err}`, ok: false });
        if (!results) return res.status(404).send({ message: `Esta lección (${lessonID}) no contiene ejercicios`, ok: false, details: 'noExercises' });

        const lessonExercises = results;
        exerciseModel.getByUserAndLessonId(userID, lessonID, (err, results) => {
            if (err) return res.status(500).send({ message: `Error al intentar acceder a los ejercicios: ${err}`, ok: false });
            if (!results) return res.status(404).send({ message: `Los ejercicios de esta lección (${lessonID}) no han sido iniciado por el usuario (${userID})`, ok: false, details: 'noRelation' });

            const exercisesByUserAndLesson = results;
            const exercises = Object.keys(lessonExercises).reduce((lastObj, key) => {
                return {
                    ...lastObj,
                    [key]: {
                        ...lessonExercises[key],
                        completed: exercisesByUserAndLesson[key].completed,
                        isCorrect: exercisesByUserAndLesson[key].isCorrect
                    }
                }
            }, {});

            return res.status(200).send({ exercises: exercises, ok: true });
        })
    })
}

const createRelationWithUser = (req, res) => {
    let userID = req.params.userID;
    let lessonID = req.params.lessonID;
    exerciseModel.getByLessonId(lessonID, (err, results) => {
        if (err) return res.status(500).send({ message: `Error al intentar acceder a los ejercicios: ${err}`, ok: false });
        if (!results) return res.status(404).send({ message: `Los ejercicios de esta lección (${lessonID}) no existen`, ok: false });

        const exercises = results;
        Object.keys(exercises).reduce((lastObj, key) => {
            exerciseModel.getUserRelation(userID, exercises[key].ID, (err, result) => {
                if (err) return res.status(500).send({ message: `Error al intentar acceder a los ejercicios comenzados: ${err}`, ok: false });
                if (result) return; 

                exerciseModel.insertUserExerciseRelation(userID, exercises[key].ID, (err, result) => {
                    if (err) return res.status(500).send({ message: `Error al intentar insertar los ejercicios: ${err}`, ok: false });
                });
            })
        }, {})

        return res.status(200).send({ message: 'Se han creado las relaciones correctamente', ok: true });
    })
}

const updateRelationWithUser = (req, res) => {
    let userID = req.params.userID;
    let exerciseID = req.params.exerciseID;
    let newValues = req.body;

    exerciseModel.updateUserExerciseRelation(userID, exerciseID, newValues, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar actualizar el ejercicio: ${err}`, ok: false });
        return res.status(200).send({ affectedRows: result, ok: true });
    })
}

const restartAllUserRelationsOfALesson = (req, res) => {
    let userID = req.params.userID;
    let lessonID = req.params.lessonID;

    exerciseModel.updateAllUserRelationsByLesson(userID, lessonID, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al intentar actualizar los ejercicios: ${err}`, ok: false });
        return res.status(200).send({ affectedRows: result, ok: true });
    })
}

const exerciseController = {
    find,
    findExercisesRelatedToUserAndOneLesson,
    createRelationWithUser,
    updateRelationWithUser,
    restartAllUserRelationsOfALesson
}

export default exerciseController;