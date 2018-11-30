//import model User: basta importar o index da pasta models, pois o index vai carregar todos os models
const { User } = require('../models')

class UserController {
    create(req, res){ 
        return res.render('auth/singup')
    }

    async store (req, res){
        //o file do avatar não é enviado pelo body, e sim no campo 'file' da req 
        //pegando o 'filename' do arq q o user enviou, q está dentro o param 'avatar' o req.file
        const { filename: avatar } = req.file
        //passando para criacao todos os dados enviados no body (...) e mais o avatar
        await User.create({
            ... req.body,
            avatar    
        })
        req.flash('success', 'Usuario criado!')
        return res.redirect('/')
    }

}

module.exports = new UserController()