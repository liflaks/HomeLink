const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middlewaree/authMiddelware')
const roleMiddleware = require('./middlewaree/roleMiddleware')

router.post('/registration', [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("password", "Пароль должен быть длиннее 6 символов").trim().isLength({min:4})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER']), controller.getUsers)

module.exports = router