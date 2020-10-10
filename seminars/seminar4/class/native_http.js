const http = require('http')

const server = http.createServer((reg,res) =>{
    console.log(reg.url, reg.method)

    if (reg.url == '/get'){
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Its get.')
        //если не писать ретерн
        //то код выполнит res.end -- отправит товет клиенту
        //но функция сама не завершится
        //т.е. дальше функция попробует отправить снова сообщение клиенту
        //но соединение уже завершенно
        return
    }



    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello world!')
})

// server запущен на localhost:8080
server.listen(8080)