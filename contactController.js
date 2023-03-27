const Contact = require('./models/Contact')

class contactController{
    async addContact(req,res){
        try{
            const{category, name, phoneNumber} = req.body
            const contact = new Contact({category, name, phoneNumber})
            await contact.save()
            return res.json({message: "Contact Added"})
        } catch(e){
            console.log(e)
        }
    }

    async getContacts(req,res){
        try{
            const contacts = await Contact.find()
            return res.json(contacts)
        } catch(e){
            console.log(e)
        }
    }


}

module.exports = new contactController()