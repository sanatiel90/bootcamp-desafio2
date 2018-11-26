//para criptografar
const bcryptjs = require('bcryptjs')

//param sequelize: instancia do ORM para conectar com o banco
//param DataTypes: define os tipos dos campos
module.exports = (sequelize, DataTypes) => {
    //cria model User com os campos/tipos; aqui nao precisam ser informados campos ID, CREATED_AT e FK
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: DataTypes.STRING,
        password: DataTypes.VIRTUAL, //VIRTUAL indica um campo q vai existir apenas no app, nao vai ser repassado para o BD; o unico password q sera salvo no banco sera o password_hash 
        password_hash: DataTypes.STRING,
        provider: DataTypes.BOOLEAN
    },
    {   //hooks sao automatizadores q serao executados quando certas operacoes com o model no DB forem feitas;
        //funciona semelhante a triggers ou acessors/mutators do laravel
        hooks: {
            //antes de salvar user no banco, se senha foi informada vai preencher o password_hash com o password criptografado 
            beforeSave: async user => {
                if(user.password){
                    user.password_hash = await bcryptjs.hash(user.password, 8)
                }
            }
        } 
    })

    //definindo novos metodos para o model: Model.prototype.nomDoMetodo
    //esse novo metodo precisa receber uma named funcion (não pode ser arrow function)
    //metodo q verifica se senha bate; vai usar o bcryptjs para comparar se o password informado no login é igual o password_hash 
    //gravado no banco do user em questao 
    User.prototype.checkPassword = function (password) {
        return bcryptjs.compare(password, this.password_hash)
    }

    return User

}