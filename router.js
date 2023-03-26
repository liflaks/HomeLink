const Router = require('express')
const router = new Router()
const Authcontroller = require('./authController')
const ApplicationController = require('./applicationController')
const ContactController = require('./contactController')
const {check} = require("express-validator")
const authMiddleware = require('./middlewaree/authMiddleware')

router.post('/registration', [
    check('username', "ФИО не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").trim().isLength({min:4, max:10}),
    check('iin', "Введите корректный ИИН").trim().isLength({min:12, max:12}),
    check('zhk', "Введите корректный ЖК").trim().notEmpty(),
    check('appartamentNumber', "Номер квартиры не может быть пустым").trim().notEmpty(),
    check('phoneNumber', "Введите корректный номер телефона").trim()
], Authcontroller.registration) //создание аккаунта

router.post('/login', Authcontroller.login) //вход в аккаунт через номер телефона и пороль

router.post('/getUserData', Authcontroller.getUser) //добавление id заявки к пользователю через токен
router.post('/checkToken', Authcontroller.checkToken) //проверка токена

router.post('/addApp', Authcontroller.addApp) //добавление id заявки к пользователю через юзер айди

router.post('/create', [
    check('title', "title не может быть пустым").notEmpty(),
    check('category', "category не может быть пустым").notEmpty(),
    check('price', "price не может быть пустым").notEmpty(),
    check('status', "status не может быть пустым").notEmpty()
], ApplicationController.create) //создание заявки

router.post('/getAppData', ApplicationController.getApp) //добавление id заявки к пользователю через юзер айди
router.get('/getAppsData', ApplicationController.getApps) //получение информации всех заявок

router.post('/updateAppStatus', ApplicationController.updateAppStatus) //изменение статуса заявки через её id 

router.get('/getStatistics', ApplicationController.getStat) //получение статистики заявок
router.get('/getStatFinance', ApplicationController.getStatFinance) //получение статистики финанс

router.post('/addContact', ContactController.addContact) //добавление контакта
router.get('/getContacts', ContactController.getContacts) //получение контактов

module.exports = router