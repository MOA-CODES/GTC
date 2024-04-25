const joi = require('joi')

const roles = ['Owner','Admin','Client']

const registerV = joi.object({
    fullname: joi.string().required(),

    email: joi.string().pattern(new RegExp('^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')).required(),

    phone: joi.string().min(11).max(11).required(),

    password: joi.string().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')).required() //the regexp here differs from that in my model by attaching an extra '\' if i spot a single '\' weird right
})

const loginV = joi.object({
    email: joi.string().pattern(new RegExp('^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')).required(),

    password: joi.string().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')).required()
})

//no need for logout validator, authentication middleware handles it so it will never reach here

const updateV = joi.object({
    nok_phone: joi.string().optional(),
    nok_name: joi.string().optional(),
    dob: joi.date().optional()
})

const updateRoleV = joi.object({
    email: joi.string().pattern(new RegExp('^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')).required(),

    role: joi.string().valid(...roles).required()
})

const getUserV = joi.object({
    phone: joi.string().optional().min(11).max(11)
})

const deleteUserV = joi.object({
    phone: joi.string().required().min(11).max(11),
    password: joi.string().optional()
})

const forgotPasswordV = joi.object({
    email: joi.string().pattern(new RegExp('^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')).required(),
   
    previousPassword: joi.string().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')).required(),

    newPassword: joi.string().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')).required(),
   
    confirmPassword: joi.string().pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')).required()
})

module.exports = {registerV, loginV, updateV,updateRoleV,getUserV,deleteUserV, forgotPasswordV}