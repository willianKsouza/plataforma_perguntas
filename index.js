const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')

connection
    .authenticate()
    .then(() => {
        console.log('conexao feita com o banco');
    })
    .catch((error) => {
        console.log(error);
    })




app.set('view engine', 'ejs');
app.use(express.static('public'))


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())





app.get('/', (req, res) => {
    Pergunta.findAll({
        raw:true,
        order:[
            ['id','DESC']
        ]
    }).then((perguntas) =>{

        res.render('index',{
            perguntas
        })
    })
    
})
app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao


    Pergunta.create({
        titulo,
        descricao
    }).then(() => {
        res.redirect('/')
    })

})

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            res.render('pergunta', {
                pergunta
            })
        }else {
            res.redirect('/')
        }
    })
})

app.listen(8080, () =>{
    console.log('rodando na porta 8080')
})