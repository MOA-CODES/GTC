const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require('../db/conn')
const {v4:uuidv4} = require('uuid')
const { validate } = require('node-cron')

const pTerminals = ['Lagos_T','Abuja_T','PortHarcourt_T','Ekiti_T']

const Bus = sequelizeInstance.define('Bus',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:() => uuidv4()
    },
    brand:{
        type: DataTypes.ENUM('KIA','BENZ','FERRARI','BUGGATTI','TOYOTA'),
        validate:{
            isIn:{
                args:['KIA','BENZ','FERRARI','BUGGATTI','TOYOTA'],
                msg:'{VALUE} is not supported'
            }
        },
        allowNull: false
    },
    destination:{
        type: DataTypes.ENUM('Lagos','Abuja','PortHarcourt','Ekiti'),
        validate:{
            isIn:{
                args:['Lagos','Abuja','PortHarcourt','Ekiti'],
                msg:'{VALUE} is not supported'
            }
        },
        allowNull: false
    },
    departureDate:{
        type:DataTypes.DATE,
        allowNull: false
    },
    terminal:{
        type: DataTypes.ENUM('Lagos_T','Abuja_T','PortHarcourt_T','Ekiti_T'),
        validate:{
            isIn:{
                args:[pTerminals],
                msg:'{VALUE} is not supported'
            }
        },
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
    destinationTerminal:{ 
    type: DataTypes.ENUM('Lagos_T','Abuja_T','PortHarcourt_T','Ekiti_T'),
    validate:{
        isIn:{
            args:[pTerminals],
            msg:'{VALUE} is not supported'
        }
    },}
})

module.exports = Bus