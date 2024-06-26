const {DataTypes} = require('sequelize')
const {sequelizeInstance} = require('../db/conn') //ill get my sequelize instance from db
const Booking = require('./Booking_M')

const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = sequelizeInstance.define('User',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue:() => uuidv4()
        },
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
        role:{ //implementing roles
            type: DataTypes.ENUM('Owner','Admin','Client'),
            defaultValue: 'Client',
            validate:{
                isIn:{
                    args:[['Owner','Admin','Client']],
                    msg:'{VALUE} is not supported'
                }
            },
        },
        nok_name: DataTypes.STRING,
        dob: DataTypes.DATEONLY // YYYY-MM-DD
});

User.beforeCreate(async(user)=>{ //like presave in mongodb
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

User.prototype.createJWT = async function(){
    console.log(process.env.TOKENTIME)
    const token = await jwt.sign({role: this.role, phone: this.phone, email: this.email, userid: this.id},process.env.KEY,{expiresIn:process.env.TOKENTIME})
    return token
}

User.prototype.comparePassword = async function(userPassword, options){
    const compare = await bcrypt.compare(userPassword, this.password)
    return compare
}

User.prototype.UpdatePassword = async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
}

User.associate = (models) =>{
    User.hasMany(models.Booking,{foriegnKey:'bookId'}) //'has many' refrences another model so take a column from that table as the fk
}

module.exports = User