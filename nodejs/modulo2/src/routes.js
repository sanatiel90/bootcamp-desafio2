//arq q gerencia as rotas
const express = require('express')
//arquivo q manipula uploads
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig) ///add a lib multer junto com o arq de confi multer????

const routes = express.Router()
//import Controller
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/', SessionController.create)
routes.post('/singin', SessionController.store)

routes.get('/singup', UserController.create)
//na rota de save, add tbm como param o upload.single('avatar'), indicando q sera feito upload de 1 arquivo cujo name é avatar 
routes.post('/singup', upload.single('avatar'), UserController.store)

routes.get('/app/dashboard', (req, res) => {
    res.send('Dashboard')
})

module.exports = routes