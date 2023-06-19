import mysqlInstance from "../services/mysql.service.js";

export default class Streak {
    constructor() {
        this.mysqlInstance = mysqlInstance;
    }

    getByUserID (userID, callback) {
        const query = 'SELECT * FROM streak WHERE userID = ?';
        const values = [userID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const streak = { ...result[0] };
            callback(null, streak);
        })
    } 

    insertStreak(userID, callback) {
        const query = 'INSERT INTO streak VALUES(null, "activa", "inactiva", "inactiva", 1, ?)';
        const values = [userID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);

            callback(null, result.insertId);
        })
    }

    update(userID, newValues, callback) {
        const query = 'UPDATE streak SET ? WHERE userID = ?';
        const values = [newValues, userID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);

            callback(null, result.affectedRows);
        })
    }
}