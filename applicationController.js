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
            return res.json({id})
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    async getApp(req, res){
        try {
            const {id} = req.body;
            const application = await Application.findOne({id});
            res.json(application)
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new applicationController()