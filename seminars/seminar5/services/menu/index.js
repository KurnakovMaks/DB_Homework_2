const pool = require('../../config/db')

//возвращает всё меню или выполняет поиск по названию
async function FindMenu(name) {
    let query = `
    Select * from menu
    where 1=1`
,
    const values = []

    if (name) {
        query += 'and name ilike $1'
        values.push(`%${name}%`)
    }
    console.log(query)

  // TODO: решить проблему, с $1 <- параметром
  // в запросе. (Например счётчик) (дз)

    const { rows } = await pool.query(query, values)
    return rows
}

module.exports = {
    findMenu,
}