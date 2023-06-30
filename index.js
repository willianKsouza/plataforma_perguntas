const express = require('express');
const bodyParser = require('body-parser')
const app = express();



app.set('view engine', 'ejs');
app.use(express.static('public'))


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())





app.get('/', (req, res) => {
    res.render('index')
})
app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    console.log(typeof titulo)
    res.send(`${titulo} ${descricao}`)
})

app.listen(8080, () =>{
    console.log('rodando na porta 8080')
})