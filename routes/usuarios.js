'use strict'
const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')
const { isValidRole, isEmailExist, isUserIdExist } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validar-campos')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'El ID seleccionado no es válido').isMongoId(),
    check('id').custom(isUserIdExist),
    check('role').custom( isValidRole ),
    validateFields
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menos 6 caractéres').isLength({ min: 6 }),
    check('correo', 'El formato de correo es inválido').isEmail(),
    check('correo').custom(isEmailExist),
    // check('role', 'Tu rol no es permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    validateFields
], usuariosPost)

router.delete('/:id', [
    check('id', 'El ID seleccionado no es válido').isMongoId(),
    check('id').custom(isUserIdExist),
    validateFields
], usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router