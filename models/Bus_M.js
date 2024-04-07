const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require('../db/conn')

const Bus = sequelizeInstance.define('Bus',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    destination:{
        type: DataTypes.STRING,
        allowNull: false
    },
    departureDate:{
        type:DataTypes.DATE,
        allowNull: false
    },
    terminal:{
        type: DataTypes.STRING,
        allowNull: false
    },
    priceChild:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceAdult:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roundTrip:DataTypes.BOOLEAN, //if true destination terminal is available
    destinationTerminal: DataTypes.STRING
})

module.exports = Bus