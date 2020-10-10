const express = require('express')
const app = express()

app.route('/get').get((reg,res)=>{
    res.send('Hello world!')
} )

app.route('/group/:group').get((reg,res)=>{
    //console.log(req)
    //из params объекта мы можем достать св-во
    const group = req.params.group
    res.send(`Hello ${group}`)
} )

app.listen(8080, ()=> {
    console.log('Server started! on localhost:8080')
})