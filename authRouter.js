const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middlewaree/authMiddleware')

router.post('/registration', [
    check('username', "ФИО не может быть пустым").trim().notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").trim().isLength({min:4, max:10}),
    check('iin', "Введите корректный ИИН").trim().isLength({min:12, max:12}),
    check('zhk', "Введите корректный ЖК").trim().notEmpty(),
    check('appartamentNumber', "Номер квартиры не может быть пустым").trim().notEmpty(),
], controller.registration)
router.post('/login', controller.login)

module.exports = router