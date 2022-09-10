const express = require('express')
const bodyParser = require('body-parser')
//para enviar eventos para os demais microsserviços
const axios = require('axios')
const { request } = require('express')

const app = express()
app.use(bodyParser.json())

const eventos = []

const portasMicrosservicos = [4000, 5000, 6000, 7000]

app.post('/eventos', (req, res) => {
    const evento = req.body
    eventos.push(evento)
     //envia o evento para o microsserviço
     for(let porta of portasMicrosservicos)
        axios.post(`http://localhost:${porta}/eventos`, evento).catch(error => console.log('Error: ' + error))
    res.status(200).send({ msg: "ok"})
})

app.get('/eventos', (request, response) => {
    response.send(eventos)
})

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000')
})