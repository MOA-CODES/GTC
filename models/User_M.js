const {DataTypes} = require('sequelize')
const {sq} = require('../db/conn') //my sequelize instance

const User = sq.define('User',{
    fullname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            is:{args: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                msg: 'Please provide a valid email address'}
        }
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            len:{
                args:[11,11],
                msg: "Phone number cannot be less or greater than 11"
            }
        },
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            is:{args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                msg: 'Password length should be >6 & have at least one lowercase, uppercase & special character'}
        }
    },
    nok_phone:{ //nok means next of kin
        type: DataTypes.INTEGER,
        validate:{
            len:{
                args:[11,11],
                msg: "Phone number cannot be less or greater than 11"
            }
        },
    },
    nok_name: DataTypes.STRING,
    dob: DataTypes.DATEONLY
    
})

module.exports = User