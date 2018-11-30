//lib para trab com datas
const moment = require('moment')
const { Appointment } = require('../models')
//obj do sequelize para usar clausulas SQL
const { Op } = require('sequelize')

//controller q lista os horarios disponiveis
class AvaliableController {
    async index(req, res){
        //criando obj moment a partir da date enviada no req.query 
        const dateAppon = moment(parseInt(req.query.date))
        //pegar todos os agendamentos do provider escolhido na data solicitada
        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.params.provider,
                dateAppon: {
                  [Op.between]: [
                      dateAppon.startOf('day').format(),
                      dateAppon.endOf('day').format()
                  ]
                }
            }
        })

        //arr com horarios disponiveis
        const schedule = [
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00'
        ]


        const avaliable = schedule.map((time) => {
            //separando a hora e minuto do array schedule
            const [hour, minute] = time.split(':')
            //definndo para um obj value  a dataAppon solicitada com a hora e minuto do arr, criando assim um obj value com varias datas/horas
            const value = dateAppon.hour(hour).minute(minute).second(0)
            return {
                time,
                value: value.format(),
                //horario avaliable: estara false se o horario solicitado já tenha passado horario atual 
                //e se já foi marcado agendamento pra esse horario por outra pessoa
                avaliable: value.isAfter(moment()) &&
                    !appointments.find((a) => moment(a.dateAppon).format('HH:mm') === time) 
            }
        })

        return res.render('avaliable/index', { avaliable })
    }
}

module.exports = new AvaliableController()