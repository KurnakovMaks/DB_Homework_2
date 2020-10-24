require('dotenv').config()
const express = require('express')
const { idleCount } = require('./config/db')
const pool = require('./config/db')
    // body parser, чтобы была возможность парсить body
const bodyParser = require('body-parser')

const app = express()
//чтобы парсить json
app.use(bodyParser.json())


//const app = express()

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

    //сделать новый заказ
    app.route('/make_order/:id').post(async(req,res) => {
        //todo: получить айди не из парам а из токена

        //todo: обраб ошибку если не удалось подключиться
        let pgclient = await pool.connect()
        try{
            
            const {id} = req.params

            //открытие транзакции
            await pgclient.query('BEGIN')

            //создали заказ и получили его айди
            const {rows } = await pgclient.query(`
            INSERT INTO order_ (client_id) VALUES ($1) RETURNING id
            `, [id])
    const orderID = rows[0].id


    // параметры для подготовки запроса
    let params = []
    let values = []
    for (const [i,item] of req.body.entries())
    {
        params.push(`$${i+1}`)
        values.push(item.menu_id)
    }

    //получить стоимость из меню
    const {rows: costQueryRes} = await pgclient.query(`
    Select id,price::numeric
    from menu
    where id IN(${params.join(',')})
    `, values)



    //созд нов перем кот включ то же что и входной боди
    //но с вычисленной ценой
    let orderWithCost = []
    //для этого пройдем по каждому эл-ту боди
    for(const item of req.body)
    {
        //и для кажд эл-та найти цену в костквери
        //полученном при помощи запроса
        let cost = null
        for (const costItem of costQueryRes)
        {
            //ищем совпадения айди в костквери с меню айди переданном в боди
            if (costItem.id === item.menu_id)
            {
                cost = costItem.price
            }
        }

        //тут кост либо нал либо с значением цены
        //если кост нал, означ что такого товара в меню не найдено //ошибка
        //делаем ролбэк и вернуть сообщ клиенту
        if (!cost)
        {
            throw new Error(`not found in menu: ${item.menu_id}`)
        }

        orderWithCost.push({
            ... item,
            cost: cost * item.count
        })
    }

    let promises = []
    for (const item of orderWithCost)
    {
        promises.push(pgclient.query(`
        INSERT INTO order_menu (order_id, menu_id, count, price)
        VALUES ($1, $2, $3, $4);
        `, [orderID, item.menu_id, item.count, item.cost]))
    }

    await Promise.all(promises)

    await pgclient.query('COMMIT')

    res.send({ order_id: orderID })
}
    
    catch(err)
    {
        await pgclient.query('ROLLBACK')
        res.status(500).send(
            { error: err.message })
            console.error(err)
    }
    
    finally
    {
        await pgclient.release()
        console.log('close db connection')
    }
})


//регистрация
//в postman { "error": "null value in column \"name\" violates not-null constraint" }
app.route('/sign_up').post(async (req,res) => 
{
    const { name, address, phone, email, password } = req.body
    
    let pgclient = await pool.connect()
    
    try
    {
        const { rows } = await pgclient.query(`
        INSERT INTO client (name, address, phone, email, password)
        VALUES ($1,$2,$3,$4,$5) RETURNING id;
        `, [name, address, phone, email, password])
        
        res.send({ id: rows[0].id })
    }
        
    catch(err)
    {
        res.status(500).send(
            {
                error: err.message
            })
            console.error(err)
    }
    finally
    {
        await pgclient.release()
    }
})

app.listen(8080, ()=> {
    console.log('Server started! on localhost:8080')
})