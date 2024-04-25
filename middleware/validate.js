const joi = require('joi')

const validate = (schema,param)=> async(req, res, next)=>{
    if(param.includes('body')){
        const x = await schema.validateAsync(req.body)
    }
    if(param.includes('params')){
        const x = await schema.validateAsync(req.params)
    }
    if(param.includes('token')){
        const x = await schema.validateAsync({token:req.user.token})
    }

    next()
}

module.exports = validate