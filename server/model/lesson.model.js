import mysqlInstance from "../services/mysql.service.js";

export default class Lesson {
    constructor() {
        this.mysqlInstance = mysqlInstance;
    }

    getById(ID, callback) {
        const query = 'SELECT * FROM lesson WHERE ID = ?';
        const values = [ID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const lesson = { ...result[0] };
            callback(null, lesson);
        })
    }

    getByUnitId(unitID, callback) {
        const query = 'SELECT * FROM lesson WHERE unitID = ?';
        const values = [unitID];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            const lessons = {};
            results.map(result => {
                let lesson = {
                    ID: result.ID,
                    title: result.title,
                    description: result.description,
                    imagePath: result.imagePath
                }   
                lessons[lesson.ID] = lesson;
            });

            callback(null, lessons);
        })
    }

    getByTitle (search, callback) {
        const query = 'SELECT * FROM lesson WHERE title LIKE ? ORDER BY title LIMIT 0, 9';
        const values = [`%${search}%`];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            const lessons = {};
            results.map(result => {
                let lesson = {
                    ID: result.ID,
                    title: result.title,
                    imagePath: result.imagePath
                }   
                lessons[lesson.ID] = lesson;
            });

            callback(null, lessons);
        })
    }

    getStartedLessons(year, userID, callback) {
        const query = 'SELECT l.ID, l.title, l.imagePath, ul.progress FROM (lesson l JOIN user_lesson ul ON l.ID = ul.lessonID) WHERE year = ? AND ul.userID = ?';
        const values = [year, userID];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            const lessons = {};
            results.map(lesson => {lessons[lesson.ID] = lesson});

            callback(null, lessons);            
        })
    }

    getUserRelation (userID, lessonID, callback) {
        const query = 'SELECT * FROM user_lesson WHERE userID = ? AND lessonID = ?';
        const values = [userID, lessonID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const lesson = { ...result[0] };
            callback(null, lesson);
        })
    }

    insertUserLessonRelation (userID, lessonID, callback) {
        const query = 'INSERT INTO user_lesson VALUES (NULL, 0, ?, ?)';
        const values = [userID, lessonID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            
            callback(null, result.insertId);
        })
    }

    updateUserLessonRelation (userID, lessonID, newValues, callback) {
        const query = 'UPDATE user_lesson SET ? WHERE userID = ? AND lessonID = ?';
        const values = [newValues, userID, lessonID];
        
        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            
            callback(null, result.affectedRows);
        })
    }
}