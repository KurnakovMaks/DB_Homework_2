//load .env to process env
require('dotenv').config()

const { Client } = require('pg')
//const Client = require('pg').Client

const client = new Client(
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATEBASE
    }
)

const name = 'Desmond'

client.connect()

client
  .query(`
  SELECT *
  FROM client
  WHERE name = $1
  `, [name])
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))
  .then(() => client.end())

// client.query(`
//     SELECT * 
//     FROM client
//     WHERE id = $1
//     `, [name], 
//     (err, res) => {
//     console.log(err, res)
//     client.end()
//   })

  console.log(1);