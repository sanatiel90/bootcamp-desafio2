//middleware q filtra se user está logado pra poder acessar uma rota
module.exports = (req, res, next) => {
    //se houver session e user na session, salvar o user de forma q fique acessivel pelos arquivos njk e passar pra prox req 
    if(req.session && req.session.user){
        //disponibilizando o user presente em req.session dentro de da locals.user, para q fique acessivel pelo njk atraves de {{ user }}  
        //de forma resumida, transforma user em uma var global
        res.locals.user = req.session.user
        console.log('USUARIO '+req.session.user)
        return next()
    }

    //se user nao autenticado entao manda pro login
    return res.redirect('/')
} 