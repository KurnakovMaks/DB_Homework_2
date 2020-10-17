require('dotenv').config()
const express = require('express')
const { idleCount } = require('./config/db')
const pool = require('./config/db')
const app = express()

app.route('/now').get(async(reg,res)=>{
    const pgclient = await pool.connect()
    const {rows} = await pgclient.query('Select now() as now')
    await pgclient.release()
    res.send(rows[0].now)
} )

app.route('/user_order/:id').get(async (req, res) => {
    
    let pgclient
    
    try{
        // значение из URL
        const { id } = req.params
        pgclient = await pool.connect()
        const {rows} = await pgclient.query(`
        SELECT id, client_id, created_at
        FROM order_
        WHERE client_id = $1
        ORDER BY created_at DESC
        `, [id])
    
        res.send(rows)
}
catch(err){
    res.status(500).send(
        { error: err.message } )
        console.error(err)
    }
    
    finally{
        await pgclient.release()
        console.log('close db connection')
    }})

    app.route('/make_order/:id').post(async(req,res) => {
        //todo: получить айди не из парам а из токена
        let pgclient
        try{
            pgclient = await pool.connect()
            const {id} = req.params
            const {rows } = await pgclient.query(`
            INSERT INTO order_ (client_id) VALUES ($1) RETURNING id
            `, [id])
    const orderID = rows[0].id
    res.send({
        order_id: orderID
    })

//todo: 1)определ со структурой, кот будем передавать
// мб так:
// [
//     {
//         menu_id:1,
//         count:2
//     }
// // ]
// 2) все делать в транзации
//3) определ как считать стоимость заказа
// 4) добавить все позиции заказа (все продукты из заказа) в ордер меню

    }
    
    catch(err){
        res.status(500).send(
            { error: err.message })
            console.error(err)
    }
    
    finally{
        await pgclient.release()
        console.log('close db connection')
    }
})

app.listen(8080, ()=> {
    console.log('Server started! on localhost:8080')
})