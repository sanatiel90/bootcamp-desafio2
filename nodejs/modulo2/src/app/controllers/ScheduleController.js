const { Appointment, User } = require('../models')

class ScheduleController {
    async index(req, res){
        const { id } = req.session.user
        const schedules = await Appointment.findAll({
            //include para acessar os dados de User contidos no appointment
            include: [{ model: User, as: 'user' }],
            where: {
                provider_id: id
            }
        })   
      
        return res.render('schedules/index', { schedules })
    }
}

module.exports = new ScheduleController()