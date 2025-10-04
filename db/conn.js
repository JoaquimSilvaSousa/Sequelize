require('dotenv').config()
const { Sequelize } = require('sequelize')

const db = new Sequelize(
  process.env.DB_NAME,         // Nome do banco
  process.env.DB_USER,         // Usuário
  process.env.DB_PASSWORD,     // Senha
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    },
    logging: false // Desativa logs chatos no terminal (opcional)
  }
)

module.exports = db
