import mysqlInstance from "../services/mysql.service.js";

export default class Unit {
    constructor() {
        this.mysqlInstance = mysqlInstance;
    }

    getById(ID, callback) {
        const query = 'SELECT * FROM unit WHERE ID = ?';
        const values = [ID];

        this.mysqlInstance.query(query, values, (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null);

            const unit = { ...result[0] };
            callback(null, unit);
        })
    }

    getByCourseId(courseID, callback) {
        const query = 'SELECT * FROM unit WHERE courseID = ?';
        const values = [courseID];

        this.mysqlInstance.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);
            
            const units = {};
            results.map(result => {
                let unit = {
                    ID: result.ID,
                    title: result.title,
                }   
                units[unit.ID] = unit;
            });

            callback(null, units);
        })
    }
}