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
            //para add uma msg flash, use req.flash(), sendo o primeiro param o tipo de msg(error/success) e o 2 param a msg em si 
            req.flash('error', 'Usuário não encontrado')
            return res.redirect('/')
        }
        //se usuario existir, verifica a senha
        //passwordCheck = 
        if(!await user.checkPassword(password)){
            req.flash('error', 'Senha incorreta')
            return res.redirect('/')
        }

        //se der tudo ok, salvar usuario na sessao e passar pra dashboard
        req.session.user = user
        
        return res.redirect('/app/dashboard')
    } 
    //logout
    destroy(req, res){
        req.session.destroy(() => {
            res.clearCookie('root') //limpa os cookies da sessao, param: nome da sessao
            return res.redirect('/')
        })
    }

}

module.exports = new SessionController()