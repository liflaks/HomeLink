const Application = require('./models/Application')
const { validationResult } = require('express-validator')

class applicationController{
    async create(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании заявки", errors})
            }
            const {id, title, category, price, status, sender, phoneNumber} = req.body;
            const application = new Application({id, title, category, price, status, sender, phoneNumber})
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
    
    async getApps(req, res){
        try {
            const applications = await Application.find();
            res.json(applications)
        } catch (e) {
            console.log(e)
        }
    }

    async getStat(req, res){
        try{
            const apps = await Application.find()
            const accepted = [];
            const declined = [];
            const waiting = [];
            const finished = [];
            apps.forEach(element => {
                const { status } = element
                if (status == 0){
                    waiting.push(status)
                }

                else if (status == 1){
                    accepted.push(status)
                }

                else if (status == 2){
                    finished.push(status)
                }

                else if (status == 3){
                    declined.push(status)
                }

                
            })
            res.json({allApps: apps.length, acceptedApps: accepted.length, declinedApps: declined.length, waitingApps:  waiting.length, finishedApps: finished.length})

        } catch(e){
            console.log(e)
        }
    }

    async getStatFinance(req, res){
        try{
            var apps = await Application.find()
            const total = []
            const appartament = []
            const entrance = [] //подъезд
            const parking = [] 
            const frontage = [] //фасад 
            const improvment = [] //благоустройство
            apps.forEach(element => {
                const { price } = element
                const { category } = element
                total.push(price)
                if (category == "Квартира"){
                    appartament.push(price)
                }

                else if (category == "Подъезд"){
                    entrance.push(price)
                }

                else if (category == "Паркинг"){
                    parking.push(price)
                }

                else if (category == "Фасад"){
                    frontage.push(price)
                }

                else if (category == "Благоустройство"){
                    improvment.push(price)
                }
            })

            let finalTotal = 0;
            let finalAppartament = 0;
            let finalEntrance = 0;
            let finalParking = 0;
            let finalFrontage = 0;
            let finalImprovment = 0;

            total.map((item) => {
                finalTotal += item
            })

            appartament.map((item) => {
                finalAppartament += item
            })

            entrance.map((item) => {
                finalEntrance += item
            })

            parking.map((item) => {
                finalParking += item
            })

            frontage.map((item) => {
                finalFrontage += item
            })

            improvment.map((item) => {
                finalImprovment += item
            })

            res.json({finalTotal: finalTotal, finalAppartament: finalAppartament, finalEntrance: finalEntrance, finalParking: finalParking, finalFrontage: finalFrontage, finalImprovment: finalImprovment})
        } catch(e){
            console.log(e)
        }
    }

    async updateAppStatus(req, res){
        try{
            const {id, status} = req.body
            const app = await Application.updateOne({'id': id }, {$set: {'status': status} });
            res.json({message: `Status Updated - Affected rows: ${app.matchedCount}`})
        } catch(e){
            console.log(e)
        }
    }

}

module.exports = new applicationController()