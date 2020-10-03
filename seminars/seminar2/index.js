//load .env to process env
require('dotenv').config() //dotenv чтобы хранить файлы локально

const { Client } = require('pg')
//const Client = require('pg').Client

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATEBASE,
})

//const name = 'Desmond'

client.connect()

//1) добавить новый автомобиль
//2) получить свободного менеджера
//3) назначить ему для продажи новый автомобиль
async function addCar() {
    const car = {
        brandId: 1,
        model: '420i',
        cost: 2500000,
        year: 2019,
        isAvailable: true,
    }

    try {
        //start transaction
        await client.query('BEGIN')
        const resCarId = await client.query(
            `
INSERT INTO car(brand_id, model,cost,year_of_creation ,	is_available) VALUES
($1,$2,$3,$4,$5) RETURNING id
`,
            [car.brandId, car.model, car.cost, car.year, car.isAvailable]
        )

        throw 'ERROR!!!!!'

        const carId = resCarId.rows[0].id

        const resManagerId = await client.query(`
SELECT id From manager
Where car_id IS NULL
LIMIT 1
`)
        const managerId = resManagerId.rows[0].id

        await client.query(
            `
UPDATE manager
SET car_id = $1
WHERE id = $2
`,
            [carId, managerId]
        )

        await client.query('COMMIT')
    } catch (err) {
        client.query('ROLLBACK')
    } finally {
        client.end()
    }
}

addCar()

// client
//     .query(
//         `
//   SELECT *
//   FROM client
//   WHERE name = $1
//   `,
//         [name]
//     )
//     .then((result) => console.log(result))
//     .catch((e) => console.error(e.stack))
//     .then(() => client.end())

//1) по указ айди менять статус на фолс
//2) по указ айди снижать цену на 10%

//1) получить все айди машин старше 2018
//2) снизить цену на полученные авто на 5%

// client.query(`
//     SELECT *
//     FROM client
//     WHERE id = $1
//     `, [name],
//     (err, res) => {
//     console.log(err, res)
//     client.end()
//   })

// console.log(1)
