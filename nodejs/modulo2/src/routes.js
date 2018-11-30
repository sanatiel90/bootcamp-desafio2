//arq q gerencia as rotas
const express = require('express')
//arquivo q manipula uploads
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig) ///add a lib multer junto com o arq de confi multer????

const routes = express.Router()
//import Controller
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvaliableController = require('./app/controllers/AvaliableController')
const ScheduleController = require('./app/controllers/ScheduleController')

//import middlewares
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

//middleware todas as rotas tenham acesso as flash messages
routes.use((req, res, next) => {
    //criando var globais com o conteudo das msg flash
    res.locals.flashSuccess = req.flash('success')
    res.locals.flashError = req.flash('error')
    return next()
})

//rota para recuperar um arquivo
routes.get('/file/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/singin', SessionController.store)

routes.get('/singup', guestMiddleware, UserController.create)
//na rota de save, add tbm como param o upload.single('avatar'), indicando q sera feito upload de 1 arquivo cujo name é avatar 
routes.post('/singup', upload.single('avatar'), UserController.store)

//todas as rotas iniciadas em app vao usar o authMiddleware
routes.use('/app', authMiddleware)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/appointment/new/:provider', AppointmentController.create)
routes.post('/app/appointment/new/:provider', AppointmentController.store)

routes.get('/app/schedule', ScheduleController.index)
routes.get('/app/schedule/user', ScheduleController.index)


//rota para saber quais horarios estao disponiveis para o provider informado
routes.get('/app/avaliable/:provider', AvaliableController.index)

module.exports = routes