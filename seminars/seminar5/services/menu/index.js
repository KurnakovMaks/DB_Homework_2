const pool = require('../../config/db')

//возвращает всё меню или выполняет поиск по названию
async function findMenu(name) {

    let countPos = 1;
    let query = `
    Select * from menu
    where 1=1`
    const values = []

    if (name) {
        query += 'and name ilike $countPos'
        values.push(`%${name}%`),
        countPos++; //решение $1
    }
    console.log(query)

    const { rows } = await pool.query(query, values)
    return rows
}

module.exports = {
    findMenu,
}