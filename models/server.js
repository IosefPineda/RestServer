'use strict'
const express = require('express')
const cors = require('cors')
const router = require('../routes/usuarios')
const { dbConection } = require('../database/config')

class Server {

    constructor(){
        //Se establecen las constantes
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        //Se hace conexión a la base de datos
        this.conectingDB()
        //Se instancian los middlewares
        this.middlewares()
        //Se instancian las rutas
        this.routes()
    }

    async conectingDB(){
        await dbConection()
    }

    middlewares(){
        //Se establece el uso de CORS
        this.app.use(cors())
        //Se establece la lectura del body
        this.app.use(express.json())
        //Se establece la carpeta pública
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, router)
    }

    //Se instancia la app
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('App corriendo...')
        })        
    }

}

module.exports = Server