const jwtDecode = require('jwt-decode');
const User = require('./models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id, roles, iin, password, zhk, appartamentNumber, phoneNumber) => {
    const payload = {
        id,
        roles,
        iin,
        password,
        zhk,
        appartamentNumber,
        phoneNumber
    }
    return jwt.sign(payload, secret, {expiresIn: "30d"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password, role, iin, zhk, appartamentNumber, phoneNumber} = req.body;
            const candidate = await User.findOne({iin})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким ИИН уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, role, iin, zhk, appartamentNumber, phoneNumber})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async getUser(req, res) {
        try {
            const {token} = req.body;
            const payload = jwtDecode(token);
            const { id } = payload;
            const user = await User.findById(id);
            res.json(user)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()