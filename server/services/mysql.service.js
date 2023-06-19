import mysql from 'mysql2';
import config from '../config/config.js';

const mysqlInstance = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
})

mysqlInstance.connect((err) => {
    console.log('Connecting to DB...');
    if (err) {
        console.log('An error occurred during the connection: ', err);
    } else {
        console.log('Successfully connected to MySQL DB')
    }
});

export default mysqlInstance;