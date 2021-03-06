'use strict'
//Importación del validator
const { validationResult } = require('express-validator')

const validateFields = (req, res, next)=>{
    //Se muestran los errores de validación
    const errors = validationResult(req)
    if( !errors.isEmpty() ){
        return res.status(400).json(errors)
    }
    next()
}

module.exports = {
    validateFields
}