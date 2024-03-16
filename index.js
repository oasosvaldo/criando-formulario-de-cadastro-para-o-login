const express = require("express")
const server = express()
const router = express.Router()

server.use(express.json({extended: true}))
server.use(router)

server.listen(3000, () => {
    console.log('Rodando Servidor');
})