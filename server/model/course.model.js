import mysqlInstance from "../services/mysql.service.js";

export default class Course {
    constructor() {
        this.mysqlInstance = mysqlInstance;
    }

    getById(ID, callback) {
        const query = 'SELECT * FROM course WHERE ID = ?';
        const values = [ID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const course = { ...result[0] };
            callback(null, course);
        })
    }

    getAll(year, callback) {
        const query = 'SELECT * FROM course WHERE year = ?';
        const values = [year]

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            const courses = {};
            results.map(result => {
                let course = {
                    ID: result.ID,
                    title: result.title,
                    imagePath: result.imagePath
                }   
                
                courses[course.ID] = course;
            });

            callback(null, courses);
        })
    }
    
    getAllTitlesBySearch (search, callback) {
        const query = 'SELECT c.ID, c.title FROM (course c JOIN unit u ON c.ID = u.courseID) JOIN lesson l ON u.ID = l.unitID WHERE l.title LIKE ? ORDER BY l.title LIMIT 0, 9';
        const values = [`%${search}%`];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            callback(null, results)
        })
    }

    getAllTitlesRelatedToStartedLessons (year, userID, callback) {
        const query = 'SELECT c.ID, c.title FROM (course c JOIN unit u ON c.ID = u.courseID) JOIN lesson l ON u.ID = l.unitID WHERE c.year = ? AND l.ID IN (SELECT lessonID FROM user_lesson WHERE userID = ?)';
        const values = [year, userID];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);

            callback(null, results)
        })
    }
}