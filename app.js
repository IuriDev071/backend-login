const userRoute = require('./src/Routes/User')
const { json } = require('express')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3030

var http = require('http')

app.use(bodyParser.urlencoded({ extended: false }))
userRoute(app)

app.get('/', (req, res) => {
    res.status(200, 'Ok').json('Backend rodando')
})

var server = http.createServer(app)

server.listen(PORT)
console.log("Rodando na porta: " + PORT)