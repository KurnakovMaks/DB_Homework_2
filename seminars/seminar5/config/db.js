//Connection to DB
const { Pool } = require('pg')

const pool = new Pool(
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATEBASE,
        max:1
    }
)
//экспортируем обект пул чтобы из других файлов можно было исподльзовать это подключение
module.exports = pool