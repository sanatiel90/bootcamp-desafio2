const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
})

app.use(express.urlencoded({extended: false}))

checkQueryMiddle = (req, res, next) => {
    const age = req.query.age
    if(age){
        console.log('tem idade')
        return next()
    }
    console.log('idade nao informada')
    return res.redirect('/')
    
}

app.set('view engine', 'njk')

app.get('/', (req, res) => {
    return res.render('new')
})

app.post('/check', (req, res) => {
    const age = req.body.age
    if(age > 18){
        return res.redirect(`/major?age=${age}`)
    }
    return res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkQueryMiddle, (req, res) => {   
    let age = req.query.age
    return res.render('major-home', { age })
})

app.get('/minor', checkQueryMiddle, (req, res) => {
    let age = req.query.age
    return res.render('minor-home', { age })
})


app.listen(3000, () =>{
    console.log('server at 3000')
})