require('dotenv').config()
const express = require('express')
// body parser, чтобы была возможность парсить body
const bodyParser = require('body-parser')

// allow cross-origin request
const cors = require('cors')

// Middleware
const authMiddleware = require('./middleware/auth')

//Services
const clientService = require('./services/client')
const menuService = require('./services/menu')
const orderService = require('./services/order')

const app = express()
//чтобы парсить application/json
app.use(bodyParser.json())
app.use(cors())

// TODO API (дз):
// 1) По id заказа order_menu возвращать состав заказа (с названием продуктов)
// 2) DELETE /user_order/:id - (id - id заказа)

app.route('/menu').get(async (req, res) => {
    const { name, price } = req.query

    try {
        const menu = await menuService.findMenu(name, price)
        res.send(menu)
    } catch (err) {
        res.status(500).send({
            error: err.message,
        })
    }
})

//все заказы конкретного пользователя
//айди будем брать из токена
app.route('/user_order').get(authMiddleware, async (req, res) => {
    try {
        const order = await orderService.findOrderByClientID(req.client.id)
        res.send(order)
    } catch (err) {
        res.status(500).send({
            error: err.message,
        })
    }
})

// Сделать новый заказ
app.route('/make_order').post(authMiddleware, async (req, res) => {
    try {
        const orderID = await orderService.makeOrder(req.client.id, req.body)

        res.send({
            order_id: orderID,
        })
    } catch (err) {
        res.status(500).send({
            error: err.message,
        })
    }
})

app.route('/sign_in').post(async (req, res) => {
    const { email, password } = req.body

    try {
        const token = await clientService.signIn(email, password)

        res.send({
            token,
        })
    } catch (err) {
        res.status(500).send({
            error: err.message,
        })
    }
})

//регистрация
//в postman { "error": "null value in column \"name\" violates not-null constraint" }
app.route('/sign_up').post(async (req, res) => {
    const { name, address, phone, email, password } = req.body

    try {
        const token = await clientService.signUp({
            name,
            address,
            password,
            phone,
            email,
        })

        res.send({
            id: token,
        })
    } catch (err) {
        res.status(500).send({
            error: err.message,
        })
    }
})

app.listen(80, () => {
    console.log('Server started! on localhost:80')
})
