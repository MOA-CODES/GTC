const User = require('../models/User_M')

const ManageOwner = async ()=>{
    const ownerExist =  await User.findAll({where:{role:'Owner'}})

    const ownerObject = {fullname:"user0",email:"user.0@gmail.com",phone:"07085556807",password:"User#0",role:"Owner"}
    if (ownerExist.length === 0){
        await User.create(ownerObject)

        console.log("Created Owner as Owner did not exist")
    }

}

module.exports = ManageOwner