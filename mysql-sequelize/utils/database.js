const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'Kamli@12345', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;