import mysqlInstance from "../services/mysql.service.js";

export default class User {
    constructor() {
        this.mysqlInstance = mysqlInstance;
    }

    getById (ID, callback) {
        const query = 'SELECT * FROM user WHERE ID = ?';
        const values = [ID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const user = { ...result[0] };
            callback(null, user);
        })
    }

    getByEmail (email, callback) {
        const query = 'SELECT * FROM user WHERE email = ?';
        const values = [email];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);
            
            const user = { ...result[0] };
            callback(null, user);
        })
    }

    getAll (callback) {
        const query = 'SELECT * FROM user';

        this.mysqlInstance.query(query, (err, results) => {
            if (err) return callback(err, null);
            
            const users = {};
            results.map(result => { 
                let user = { ...result };
                users[user.ID] = user;
            });

            callback(null, users);
        })
    }

    insertUser (user, callback) {
        const query = 'INSERT user VALUES(null, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, 0)';
        const values = [user.name, user.surnames, user.age, user.email, user.password, user.school, user.ccaa, user.imagePath];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            
            callback(null, result.insertId);
        })
    }

    updateUser (ID, newValues, callback) {
        const query = 'UPDATE user SET ? WHERE ID = ?';
        const values = [newValues, ID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);

            callback(null, result.affectedRows);
        })
    }
}
