const Application = require('./models/Application')
const { validationResult } = require('express-validator')

class applicationController{
    async create(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании заявки", errors})
            }
            const {id, title, category, price, status, date_sending, date_execution} = req.body;
            const application = new Application({id, title, category, price, status, date_sending, date_execution})
            await application.save()
            return res.json({message: "Заявка отправлена"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Application error'})
        }
    }
}

module.exports = new applicationController()