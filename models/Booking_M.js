const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require ('../db/conn')
const User = require('./User_M')
const Bus = require('./Bus_M')

const {v4:uuidv4} = require('uuid')

const Booking = sequelizeInstance.define('Booking', {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: ()=>uuidv4(),
    }

},{timestamps:true})

// Booking.belongsTo(User, {
//     foriegnKey: 'userid',
//     as: 'user'
// })

// Booking.BelongsTo(Bus, {
//     foriegnKey: 'busid',
//     as: 'bus'
// })

module.exports = Booking