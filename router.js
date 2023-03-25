const Router = require('express')
const router = new Router()
const Authcontroller = require('./authController')
const ApplicationController = require('./applicationController')
const {check} = require("express-validator")
const authMiddleware = require('./middlewaree/authMiddleware')

router.post('/registration', [
    check('username', "ФИО не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").trim().isLength({min:4, max:10}),
    check('iin', "Введите корректный ИИН").trim().isLength({min:12, max:12}),
    check('zhk', "Введите корректный ЖК").trim().notEmpty(),
    check('appartamentNumber', "Номер квартиры не может быть пустым").trim().notEmpty(),
    check('phoneNumber', "Введите корректный номер телефона").trim()
], Authcontroller.registration)

router.post('/login', Authcontroller.login)

router.post('/getuserdata', Authcontroller.getUser)

router.post('/create', [
    check('title', "title не может быть пустым").notEmpty(),
    check('category', "category не может быть пустым").notEmpty(),
    check('price', "price не может быть пустым").notEmpty(),
    check('status', "status не может быть пустым").notEmpty()
], ApplicationController.create)

router.post('/getappsdata', ApplicationController.getApp)

router.post('/updateappstatus', ApplicationController.updateAppStatus)

router.get('/getstatistics', ApplicationController.getStat)

module.exports = router