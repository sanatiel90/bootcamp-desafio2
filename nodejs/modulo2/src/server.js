//no server js fica a logica do servidor
const express = require('express')
const nunjucks = require('nunjucks')
//path para melhor acessar os diretorios
const path = require('path')

class App {
    //ao criar nova instancia de App sera instanciado o express e chamado os metodos de config
    constructor(){
        //prop com instancia de express
        this.express = express()
        //prop q informa se está em ambiente de desenv
        this.isDev = process.env.NODE_ENV !== 'production' 

        this.middlewares()
        this.views()
        this.routes()
    }

    //met q configura middlewares
    middlewares(){
        this.express.use(express.urlencoded({extended:false})) //para aceitar envio de dados via form
    }

    //met q config views
    views(){           //no path.resolve passa como param o dir atual, e a sequencia de dir onde quer chegar, dir separados por virgula     
        nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
            watch: this.isDev,
            express: this.express,
            autoescape: true
        })
        
        this.express.use(express.static(path.resolve(__dirname, 'public'))) //fazendo express enxergar arquivos dentro da pasta 'public'
        this.express.set('view engine', 'njk') //setando a engine
    }

    //met q config routes
    routes(){
        //importando as rotas do modulo routes
        this.express.use(require('./routes'))
    }
}

//exportando apenas o express dentro de uma nova instancia de App
module.exports = new App().express
