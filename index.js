const express = require("express")
const server = express()
const router = express.Router()
const fs = require('fs')
const { cpuUsage } = require("process")

server.use(express.json({extended: true}))

const readFile = () => {
    const content = fs.readFileSync('./data/items.json', 'utf-8')
    return(JSON.parse(content))    
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./data/items.json', updateFile, 'utf-8')
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)
})

router.post('/', (req, res) => {
    const {name, email, phone} = req.body
    const currentContent = readFile()
    const id = Math.random().toString(32).substr(2, 9)
    currentContent.push({id, name, email, phone})
    writeFile(currentContent)
    res.send({id, name, email, phone})
})
router.put('/:id', (req, res) => {
    const {name, email, phone} = req.body
    const {id} = req.params
    const currentContent = readFile()
    const serlectItem = currentContent.findIndex((item) => item.id === id)
    currentContent[serlectItem] = {name, email, phone}
    res.send(currentContent)
})
router.delete('/', (req, res) => {
    res.send('Bem Vindo')
})

server.use(router)

server.listen(3000, () => {
    console.log('Rodando Servidor');
})