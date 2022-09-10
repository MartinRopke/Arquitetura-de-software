const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        if( !(observacao.lembreteId in baseConsulta) )
            return console.log('Não tem lembrete seu animal')
        const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || []
        observacoes.push(observacao)

        
        baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]['Observacoes']
        const indice = observacoes.findIndex(o => o.id === observacao.id)
        observacoes[indice] = observacao
    }
}

app.get('/lembretes', (req, res) => {
    res.status(200).send(baseConsulta)
})

app.post('/eventos', (req, res) => {
    funcoes[req.body.tipo](req.body.dados)
    res.status(200).send(baseConsulta)
})

app.listen(6000, async () => {
    console.log('Consultas. Porta 6000')
    const response = await axios.get('http://localhost:10000/eventos')
    //axios entrega os dados ma pripriedade data
    response.data.forEach((valor, indice, colecao) => {
        if(valor.tipo in funcoes)
            funcoes[valor.tipo](valor.dados)
    })
})