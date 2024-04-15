const {sequelizeInstance} = require('../db/conn')
const {Sequelize, DataTypes} = require('sequelize')
const op = Sequelize.Op


const TBlacklist = sequelizeInstance.define('TBlacklist',{
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
    const currentdate = new Date()
    currentdate.setMinutes(currentdate.getMinutes() + 10)
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