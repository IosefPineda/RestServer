'use strict'
const { response } = require('express')

const usuariosGet = (req, res = response)=> {
    const params = req.query
    res.json({
        msg: 'Petición GET',
        params
    })
},

usuariosPut = (req, res)=> {
    const id = req.params.id
    res.json({
        msg: 'Petición PUT',
        id
    })
},

usuariosPost = (req, res)=> {
    const {nombre, edad} = req.body
    res.json({
        msg: 'Petición POST',
        nombre,
        edad
    })
},

usuariosDelete = (req, res)=> {
    res.json({
        msg: 'Petición DELETE'
    })
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