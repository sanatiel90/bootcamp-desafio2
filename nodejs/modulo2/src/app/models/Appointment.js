//model para agendamentos de serviços dos cabeleireiros
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        //campo para data do appoint
        dateAppon: DataTypes.DATE
    })

    //criando associacoes/relacionamentos entre models
    Appointment.associate = models => {
        //o metodo belongsTo informa q esse model pertence a outro model(nesse caso, User); ele cria uma FK no Appointment
        //apontando para o model a qual pertence 
        //params: belongsTo(models.NomeDoModel, { foreignKey: nome_do_campo_fk q vai ser criado no Appointment })
        Appointment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
        Appointment.belongsTo(models.User, { foreignKey: 'provider_id' })
    }

    return Appointment
}