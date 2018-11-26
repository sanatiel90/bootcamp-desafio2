const express = require('express')
//template engine
const nunjucks = require('nunjucks')


//////ALGUMAS EXTENSOES INSTALADAS:
//ESLINT: cria um padrão para o cód., padrão esse q é aplicado ao código quando salvo (Ex: colocar ponto-e-virgula no fim da instrucao; sempre usar aspas duplas para strings, etc)
//PRETTIER: automatiza a aplicação do padrão definido pelo ESLINT quando o cód for salvo

const app = express()
//permite o express manipular info q será enviada por um form
app.use(express.urlencoded({ extended:true }))

//configurando o nunjucks, informando a pasta padrão onde ficarão as views e um obj de config, com info do autoescape,
//a instacia express da aplicacao e watch true para funcionar como nodemon
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
})

//set() seta config globais; nesse caso está definindo qual a extensao será usada pela view engine instalada
app.set('view engine', 'njk')

//usando middlewares: servem para manipular o fluxo de requisicoes
//middleware exemplo: vai exibir um log com informações da requisicao q foi feita; por padrão um middleware interrompe
//o fluxo normal das req., fazendo com q a app fique estacionada ao chegar no middleware. Para q a app, depois q
//chegar no middleware, continue para a prox requisicao, é preciso add um param 'next' e retornar a prox req. atraves da funcao
//next(). É possivel atribuir valores a variaveis e repassá-las para que sejam acessadas por outras rotas que usam o middlware

const logMiddleware = (req, res, next) => {
    //printa info da requisicao
    console.log(
        `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method} `
    )
    //atribuindo uma var à requisicao para ser acessada pelas outras rotas
    req.appName = 'GoNode'
    //passa para prox req.
    return next()
}

//adicionando middlewares: pode ser passado como 2º parametro do metodo de requisicao(get, post, put, etc), podendo
//ser colocados vários middlewares separados por vírgula. Para adicionar um middleware a todas as rotas basta usar o use()
app.use(logMiddleware)

app.get('/' , logMiddleware, (req, res) => {
    res.send(`Olá ${req.query.name}, bem vindo ao curso de ${req.appName}`)
})

app.get('/nome/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}`)
})

app.get('/json', (req, res) => {
    res.json({
        message: `Welcome, ${req.query.person}`
    })
})

//renderizando uma view do nunjucks
const users = ['sanatiel', 'fabio', 'marcos', 'luiz']

app.get('/users', (req, res) => {
    return res.render('list', { users })
})

app.get('/new', (req, res) => {
    return res.render('new')
})

app.post('/create', (req, res) => {
    users.push(req.body.user)
    return res.redirect('/users')
})

app.listen(3000, () =>{
    console.log('server started at 3000')
})
