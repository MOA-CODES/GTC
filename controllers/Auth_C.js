const User = require('../models/User_M')
const {TBlacklist} = require('../models/TBlacklist_M')
const {StatusCodes} = require('http-status-codes')
const {customError} = require('../services')

const register = async (req, res)=> {
    const user = await User.create(req.body)

    const token = await user.createJWT()

    return res.status(StatusCodes.CREATED).json({msg:`User- ${user.fullname}, created successfully`,token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email){
        throw new customError('Provide email', StatusCodes.BAD_REQUEST)
    }

    if(!password){
        throw new customError('Provide password', StatusCodes.BAD_REQUEST)
    }

    const user = await User.findOne({where:{email}})//they are so stupid or extra for needing "where"

    if(!user){
        throw new customError("User does not exist", StatusCodes.NOT_FOUND)
    }

    const compare = await user.comparePassword(password)

    if(!compare){
        throw new customError('Wrong password', StatusCodes.UNAUTHORIZED)
    }

    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({msg:`${user.role} login successfull`, token})
}

const logout = async (req, res) => { //front end dev puts the token in auth header after login or registration
    const {token} = req.user  

    await TBlacklist.create({token})

    res.status(StatusCodes.OK).json({msg:`logout successfull`})
}

const update = async (req, res)=>{

    const {email} = req.user

    const finduser = await User.findOne({where:{email}})

    if(!finduser){
        throw new customError("User does not exist", StatusCodes.NOT_FOUND)
    }

    const {nok_phone, nok_name, dob} = req.body

    const updateObject = {};

    if(nok_phone){
        updateObject.nok_phone = nok_phone
    }

    if(nok_name){
        updateObject.nok_name = nok_name
    }

    if(dob){
        updateObject.dob = dob
    }

    if(Object.keys(updateObject).length === 0){
        throw new customError("Provide your date of birth, or next of kin details to update your profile", StatusCodes.BAD_REQUEST, "Incomplete Data")
    }

    const user = await User.update(updateObject, {where:{email},returning:true})
    //sequelize returns its updates in an array format, first value is the number of rows updated, then the next fields are the rows that were updated

    const result = {...user[1][0].dataValues}

    res.status(StatusCodes.OK).json({msg:`${result.fullname} was updated` })
}

const updateRole = async (req, res) => {

    const {email, role} = req.body

    if(!(email && role)) {
        throw new customError('email and role are required to update role', StatusCodes.BAD_REQUEST, "Hierachy error" )
    }

    const findOwners = await User.findAll({where:{role:"Owner"}})

    if(role === 'Owner' && findOwners.length >= 1){
        throw new customError("There can't be more than one owner", StatusCodes.NOT_FOUND)
    }

    const findUser = await User.findOne({where:{email}})

    if(!findUser){
        throw new customError('user does not exist', StatusCodes.NOT_FOUND)
    }
    const updateObject = {email, role}

    const updateUser = await User.update(updateObject, {where:{email},returning:true})

    const result = {...updateUser[1][0].dataValues}

    res.status(StatusCodes.OK).json({msg:`updated ${result.fullname}, role`, updateUser})

}

const getUser = async(req, res)=>{//if you put a phone number get that user, if you dont get all users

    const {phone} = req.body 
    const {role} = req.user

    let user;

    if(phone){
      switch (role){
        case 'Client':
            user = await User.findOne({where:{phone,role},attributes:{exclude:['password']}});
            break;
        default:
            user = await User.findOne({where:{phone},attributes:{exclude:['password']}})
      }
    }else{
        switch (role){
            case 'Client':
                user = await User.findAll({where:{role},attributes:["fullname","email","phone",],})
                break;
            default:
                user = await User.findAll({attributes:{exclude:["password"]}})
            }  
    }

    res.status(StatusCodes.OK).json({user})
}

const deleteUser = async(req, res)=>{ //review later, by making an admin
    const {phone} = req.params
    const {password} = req.body

    if(!phone){
        throw new customError("Provide a phone number to delete user", StatusCodes.BAD_REQUEST)
    }

    const findUser = await User.findOne({where:{phone}})

    if(!findUser){
        throw new customError("User doesn't exist", StatusCodes.BAD_GATEWAY)
    }else if(findUser.role === "Owner"){
        if(!password){
            throw new customError("Password is needed for this action", StatusCodes.BAD_REQUEST)
        }

        const compare = await findUser.comparePassword(password)

        if(!compare){
            throw new customError("Password for current Owner is false", StatusCodes.UNAUTHORIZED,"Permission error")
        }

        await User.destroy({where:{phone}})
    }else{
        await User.destroy({where:{phone}}) //returns 1 if something was found, 0 otherwise
    }

    res.status(StatusCodes.OK).json({msg:`Deleted User with phone number: ${phone}`})
}

const test = async(req, res)=>{

    const {email, role} = req.body

    if(!(email && role)) {
        throw new customError('email and role are required to update role', StatusCodes.BAD_REQUEST )
    }

    const findUser = await User.findOne({where: {email}})

    if(!findUser){
        throw new customError('user does not exist', StatusCodes.NOT_FOUND)
    }

    const updateObject = {email, role}

    const updateUser = User.update(updateObject, {where:{email},returning:true})

    const result = {...user[1][0].dataValues}

    res.status(StatusCodes.OK).json({msg:`updated ${result.fullname}, role`, updateUser})

}

module.exports = {register, logout, login, update, updateRole, getUser, deleteUser, test}