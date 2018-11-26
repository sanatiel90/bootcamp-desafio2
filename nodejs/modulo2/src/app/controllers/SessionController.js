const { User } = require('../models')

class SessionController {
    async create(req, res){
        return res.render('auth/singin')
    }
    //metodo login
    async store(req, res){
        const { email, password } = req.body
        //busca no banco por um usuario com o email informado
        const user = await User.findOne({ where: { email } })

        if(!user){
            console.log('usuario nao encontrado')
            return res.redirect('/')
        }
        //se usuario existir, verifica a senha
        //passwordCheck = 
        if(!await user.checkPassword(password)){
            console.log('senha nao corresponde')
            return res.redirect('/')
        }

        //se der tudo ok passa pra dashboard
        return res.redirect('/app/dashboard')

    } 
}

module.exports = new SessionController()