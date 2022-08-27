const express = require("express")
const app = express()
app.use(express.json())

const palavraChave = 'importante'

const funcoes = {
    observacaoCriada
}

function observacaoCriada(observacao){
    observacao.status = observacao.texto.includes(palavraChave) ? 'importante':'comum'
    axios.post('http://localhost:10000/eventos', { tipo: 'ObservacaoClassificada', dados: observacao})
}

app.post('/eventos', (request , response) => {
    funcoes[request.body.tipo](request.body.dados)
    response.status(200).send({msg:'ok'})
})

app.listen(7000, () => console.log('Classificação. Porta 70000'))