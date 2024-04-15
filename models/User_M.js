const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require('../db/conn') //ill get my sequelize instance from db

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { use } = require('express/lib/router');

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
        // token:{
        //     type: DataTypes.STRING,
        //     unique: true,
        // },
        nok_name: DataTypes.STRING,
        dob: DataTypes.DATEONLY // YYYY-MM-DD
        
});

User.beforeCreate(async(user)=>{ //like presave in mongodb
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

User.prototype.createJWT = async function(){
    const token = await jwt.sign({phone: this.phone, email: this.email},process.env.KEY,{expiresIn:process.env.TIME})
    // this.token = token; // I don't need to save my tokens
    // await this.save()
    return token
 }

User.prototype.comparePassword = async function(userPassword, options){
    const compare = await bcrypt.compare(userPassword, this.password)
    return compare
}

 module.exports = User