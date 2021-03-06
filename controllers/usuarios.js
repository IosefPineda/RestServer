'use strict'
const { response, request } = require('express')
//Se importa el modelo de usuario DB
const Usuario = require('../models/usuarioDB')
//Se importa brcyptjs
const bcryptjs = require('bcryptjs')

const usuariosGet = async (req = request, res = response)=> {
    //Se destructura la petición
    const { limite = 3, desde = 0 } = req.query
    //Se establece el tipo de usuario
    const active = { estado: true }

    //Se establece promesa que regresa los usuarios
    const [total, usuarios] = await Promise.all([
        //Constante para sacar el número total de registros
        Usuario.countDocuments(active),
        //Se establece la paginación
        Usuario.find(active)
            //Se indica desde donde consultar
            .skip(Number(desde))
            //Se establece el límite
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })

},

usuariosPut = async(req, res)=> {
    const id = req.params.id
    const { _id, password, google, correo, ...rest } = req.body

    if(password){
        //Se encripta la contraseña
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest)

    res.json(usuario)
},

usuariosPost = async (req, res)=> {

    //Se destructura el body 
    const { nombre, correo, password, role} = req.body
    //Se instancia mongoose
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        role
    })
    //Se encripta la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)
    //Se graba el registro
    await usuario.save()

    res.json({
        msg: 'Petición POST',
        usuario
    })

},

usuariosDelete = async (req, res)=> {
    //Se destrucutra el id de la url
    const { id } = req.params
    //Borrado físico del registro
    /*---const user = await Usuario.findByIdAndDelete(id)---*/
    const user = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json(user)

},

usuariosPatch = (req, res)=> {
    res.json({
        msg: 'Petición PATCH'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}