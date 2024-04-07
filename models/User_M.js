const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require('../db/conn') //ill get my sequelize instance from db

const User = sequelizeInstance.define('User',{
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
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
            validate:{
                len:{
                    args:[11,11],
                    msg: "Phone number cannot be less or greater than 11"
                }
            },
        },
        nok_name: DataTypes.STRING,
        dob: DataTypes.DATEONLY
        
});

 module.exports = User