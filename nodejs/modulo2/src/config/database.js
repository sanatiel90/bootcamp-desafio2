//confg do banco
module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: 'postgres',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true, //add campos created_at e updated_at a todas as tabelas
    underscored: true, //define q os campos usarao nomes snake_case: 
    underscoredAll: true //tabelas snake_case
  }
}