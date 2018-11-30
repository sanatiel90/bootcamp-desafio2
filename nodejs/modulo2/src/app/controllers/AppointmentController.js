const { User, Appointment } = require('../models')

class AppointmentController {
    async create(req, res){
        const provider = await User.findByPk(req.params.provider)
        res.render('appointments/create', { provider })
    }

    async store(req, res){
        const { id } = req.session.user  //id do user logado
        const { provider } = req.params //id do provider
        const { dateAppon } = req.body //data

        await Appointment.create({
            user_id: id,
            provider_id: provider,
            dateAppon
        })
        req.flash('success', 'Agendamento realizado com sucesso!')
        res.redirect('/app/dashboard')
    }
}

module.exports = new AppointmentController()