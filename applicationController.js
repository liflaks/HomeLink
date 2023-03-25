const Application = require('./models/Application')

class applicationController{
    async create(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании заявки", errors})
            }
            const {id, title, category, price, status, date_sending, date_execution} = req.body;
            const application = new application({})
            await application.save()
            return res.json({message: "Заявка отправлена"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Application error'})
        }
    }
}