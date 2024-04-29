const {StatusCodes} = require('http-status-codes')

const acceptPayments = async(req, res)=>{
    const {email, amount} = req.body //amount in kobo

    const params = JSON.stringify({
        "email": email,
        "amount": amount * 100
    })

    const options = {
        method:'POST',
        headers:{
            Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
        body: params
    }

    try{
        const call = await fetch('https://api.paystack.co/transaction/initialize', options)
        const response = await call.json()
        res.status(StatusCodes.OK).json(response)
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:{name:error.name, msg:error.message}})
    }    
}

const verifyPayments = async(req, res)=>{
    const {reference} = req.params

    const options = {
        method:'GET',
        headers:{
            Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

        }
    }

    try{
        const call = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, options)
        const response = await call.json()
        res.status(StatusCodes.OK).json(response)
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:{name:error.name, msg:error.message}})
    }
}

const getTransactions = async(req, res)=>{
    const options = {
        method: 'GET',
        headers:{
            Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

        }
    }

    try{
        const call = await fetch('https://api.paystack.co/transaction/',options)
        const response = await call.json()
        res.status(StatusCodes.OK).json({no_Transactions: response.data.length,response})
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:{name:error.name, msg:error.message}})
    }
}

const getTransaction = async(req, res)=>{

    const {id} = req.params

    const options = {
        method: 'GET',
        headers:{
            Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        }
    }

    try{
        const call = await fetch(`https://api.paystack.co/transaction/${id}`,options)
        const response = await call.json()
        res.status(StatusCodes.OK).json({no_Transactions: response.data.length,response})
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:{name:error.name, msg:error.message}})
    }

}

const chargeAuthorization = async(req, res)=>{
    const {email, amount, authorization_code} = req.body

    const params = JSON.stringify({
        "email": email,
        "amount": amount * 100,
        "authorization_code": authorization_code
    })

    const options = {
        method: 'POST',
        headers:{
            Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
        body: params
    }

    try{
        const call = await fetch('https://api.paystack.co/transaction/charge_authorization',options)
        const response = await call.json()
        res.status(StatusCodes.OK).json(response)
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:{name:error.name, msg:error.message}})
    }
}

const transactionTotals = async(req, res)=>{
    const options = {
        method: 'GET',
        headers:{
            Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        }
    }

    try{
        const call = await fetch('https://api.paystack.co/transaction/totals',options)
        const response = await call.json()
        res.status(StatusCodes.OK).json({no_Transactions: response.data.length,response})
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:{name:error.name, msg:error.message}})
    }
}

module.exports = {acceptPayments, verifyPayments, getTransactions, getTransaction, chargeAuthorization, transactionTotals}