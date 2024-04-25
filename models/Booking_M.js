const {DataTypes} = require('sequelize')
const {v4:uuidv4} = require('uuid')

const {sequelizeInstance} = require ('../db/conn')
const User = require('./User_M')
const Bus = require('./Bus_M')

const Booking = sequelizeInstance.define('Booking', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:() => uuidv4()
    },
    userid:{
        type: DataTypes.UUID,
        allowNull: false,

    },
    busid:{
        type: DataTypes.UUID,
        allowNull: false,

    }
},
{timestamps:true})

Booking.associate = (models) => {
    Booking.belongsTo(models.Bus, {foreignKey: 'busid'})//'belongs To' needs to the fk to be from this model
    Booking.belongsTo(models.User, {foreignKey: 'userid'})//'belongs To' needs to the fk to be from this model
}


module.exports = Booking