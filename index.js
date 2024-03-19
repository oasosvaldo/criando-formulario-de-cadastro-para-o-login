const express = require("express")
const server = express()
const router = express.Router()
const fs = require('fs')
const { cpuUsage } = require("process")

server.use(express.json({extended: true}))

const readFile = () => { // funcao readFile le e converte um arquivo JSON para texto
    const content = fs.readFileSync('./data/items.json', 'utf-8')
    return(JSON.parse(content))    
}

const writeFile = (content) => { // funcao writeFile le e converte uma arquivo texto para JSON
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./data/items.json', updateFile, 'utf-8')
}

router.get('/', (req, res) => { // le o arquivo JSON
    const content = readFile()
    res.send(content)
})

router.post('/', (req, res) => { // Cria um dado dentro do arquivo JSON
    const {name, email, phone} = req.body
    const currentContent = readFile()
    const id = Math.random().toString(32).substr(2, 9)
    currentContent.push({id, name, email, phone})
    writeFile(currentContent)
    res.send({id, name, email, phone})
})
router.put('/:id', (req, res) => { // Altera um dado dentro do ar
    const {id} = req.params

    const {name, email, phone} = req.body
    
    const currentContent = readFile()
    const serlectItem = currentContent.findIndex((item) => item.id === id)

    const {id: cId, name:cName, email: cEmail, phone: cPhone} = currentContent[serlectItem]

    const newObject = {
        id: cId,
        name: name ? name: cName,
        email: email ? email: cEmail,
        phone: phone ? phone: cPhone,
    }

    currentContent[serlectItem] = newObject
    writeFile(currentContent)

    res.send(newObject)
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    const currentContent = readFile()
    const serlectItem = currentContent.findIndex((item) => item.id === id)
    currentContent.splice(serlectItem, 1)
    writeFile(currentContent)
    res.send(true)
})

server.use(router)

server.listen(3000, () => {
    console.log('Rodando Servidor');
})