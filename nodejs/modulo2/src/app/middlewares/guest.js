//middleware q filtra, se user está logado não acessar rota de login e cadastro
module.exports = (req, res, next) => {
    //se houver session mas nao houver user na session, passar pra prox req 
    if(req.session && !req.session.user){
        return next()
    }

    //se user ja autenticado entao manda pra dashboard
    return res.redirect('/app/dashboard')
} 