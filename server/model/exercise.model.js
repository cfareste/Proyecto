import mysqlInstance from "../services/mysql.service.js";

export default class Exercise {
    constructor() {
        this.mysqlInstance = mysqlInstance;
    }

    getById(ID, callback) {
        const query = 'SELECT * FROM exercise WHERE ID = ?';
        const values = [ID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const exercise = { ...result[0] };
            callback(null, exercise);
        })
    }

    getByLessonId(lessonID, callback) {
        const query = 'SELECT * FROM exercise WHERE lessonID = ?';
        const values = [lessonID];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            const exercises = {};
            results.map(result => exercises[result.ID] = result);

            callback(null, exercises);
        })
    }

    getByUserAndLessonId(userID, lessonID, callback) {
        const query = 'SELECT * FROM user_exercise WHERE userID = ? AND exerciseID IN (SELECT ID FROM exercise WHERE lessonID = ?)';
        const values = [userID, lessonID];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            const exercises = {};
            results.map(result => {
                const exercise = {
                    ID: result.ID,
                    completed: result.completed,
                    isCorrect: result.isCorrect,
                    exerciseID: result.exerciseID
                }
                exercises[exercise.exerciseID] = exercise; 
            });

            callback(null, exercises);
        })
    }

    getUserRelation (userID, exerciseID, callback) {
        const query = 'SELECT * FROM user_exercise WHERE userID = ? AND exerciseID = ?';
        const values = [userID, exerciseID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const exercise = { ...result[0] };
            callback(null, exercise);
        })
    }

    insertUserExerciseRelation (userID, exerciseID, callback) {
        const query = 'INSERT INTO user_exercise VALUES (NULL, 0, 0, ?, ?)';
        const values = [userID, exerciseID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);

            callback(null, result.insertId);
        })
    }

    updateUserExerciseRelation (userID, exerciseID, newValues, callback) {
        const query = 'UPDATE user_exercise SET ? WHERE userID = ? AND exerciseID = ?';
        const values = [newValues, userID, exerciseID];
        
        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            
            callback(null, result.affectedRows);
        })
    }

    updateAllUserRelationsByLesson (userID, lessonID, callback) {
        const query = 'UPDATE user_exercise SET completed = 0, isCorrect = 0 WHERE userID = ? AND exerciseID IN (SELECT ID FROM exercise WHERE lessonID = ?)';
        const values = [userID, lessonID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            
            callback(null, result.affectedRows);
        })
    }
}