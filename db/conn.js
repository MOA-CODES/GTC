const Sequelize = require('sequelize')

const sequelizeInstance = new Sequelize(process.env.PGSQL_DB_URI, {freezeTableName: true}) //

const connectDB = async()=>{
    try{
        return await sequelizeInstance.authenticate().then(()=>console.log("Connection has been established successfully"))
    }catch(e){
        console.log("Unable to connect to the database").then(()=>process.exit(1))
    }
}


module.exports ={connectDB, sequelizeInstance}

