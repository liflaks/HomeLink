const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")

router.post('/registration', [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("password", "Пароль должен быть длиннее 6 символов").trim().isLength({min:4})
], controller.registration)

router.post('/login', controller.login)

router.get('/users', controller.getUsers)

module.exports = router