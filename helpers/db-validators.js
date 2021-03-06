'use strict'
const Role = require('../models/role')
//Se importa el modelo de usuario DB
const Usuario = require('../models/usuarioDB')

const isValidRole = async (role = '') =>{
    const existRole = await Role.findOne({ role })
    if(!existRole){
        throw new Error(`El rol: ${role}, no es válido`)
    }
},

isEmailExist = async (correo = '')=>{
    //Se verifica si el correo existe
    const emailExist = await Usuario.findOne({correo})
    if(emailExist){
        throw new Error(`El correo: ${correo} ya cuenta con un usuario`)
    }
},

isUserIdExist = async (id = '')=>{
    //Se verifica si el ID existe
    const userExist = await Usuario.findById(id)
    if(!userExist){
        throw new Error(`El id: ${id} no existe`)
    }
}


module.exports = {
    isValidRole,
    isEmailExist,
    isUserIdExist
}