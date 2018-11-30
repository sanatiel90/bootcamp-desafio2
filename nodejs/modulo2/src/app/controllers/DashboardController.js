const { User } = require('../models')

class DashboardController {
    //lista os cabeleireiros(chamados de providers por serem provedores de serviço)
    async index(req, res){
        const providers = await User.findAll({ where: { provider: true } })
        return res.render('dashboard', { providers })
    }
}

module.exports = new DashboardController