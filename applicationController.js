const Application = require('./models/Application')
const { validationResult } = require('express-validator')

class applicationController{
    async create(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании заявки", errors})
            }
            const {id, title, category, price, status} = req.body;
            const application = new Application({id, title, category, price, status})
            await application.save()
            return res.json({message: "Заявка отправлена"})
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    }
}

module.exports = new applicationController()