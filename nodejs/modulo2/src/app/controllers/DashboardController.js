const { User } = require('../models')
const { Op } = require('sequelize')
class DashboardController {
    //lista os cabeleireiros(chamados de providers por serem provedores de serviço)
    async index(req, res){
        const { id } = req.session.user
        //mostrando todos os providers, menos o proprio provider logado
        const providers = await User.findAll({ 
            where: { 
                provider: true,
                id: {
                    [Op.ne]: id
                }
                                  
            }
        })
        return res.render('dashboard', { providers })
    }
}

module.exports = new DashboardController