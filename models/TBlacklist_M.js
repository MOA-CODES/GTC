const {Sequelize, DataTypes} = require('sequelize')
const {v4:uuidv4} = require('uuid')

const {sequelizeInstance} = require('../db/conn')

const op = Sequelize.Op

const TBlacklist = sequelizeInstance.define('TBlacklist',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:() => uuidv4()
    },
    token:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    deleteAt:{
        type: DataTypes.DATE
    }
})

TBlacklist.beforeCreate(async(tb)=>{
    const currentdate = new Date();
    currentdate.setMinutes(currentdate.getMinutes() + process.env.TIME)
    tb.deleteAt = currentdate
})

const purgeTB = async function(){
    const currentdate = new Date()

    try{
        await TBlacklist.destroy({
            where:{
                deleteAt:{
                    [Op.lt]: currentdate
                }
            },
            truncate:true
        })
    }catch(e){

    }
}

module.exports = {TBlacklist, purgeTB}