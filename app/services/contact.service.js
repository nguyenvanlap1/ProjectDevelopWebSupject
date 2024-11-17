const {ObjectId} = require('mongodb');

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection('contacts');
    }

    //define method below
    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite
        }

        Object.keys(contact).forEach((key)=>{
            contact[key] === undefined && delete contact[key];
        })
        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {$set: {favorite: contact.favorite===true}},
            {returnDocument: 'after', upsert: true}
        )
        return result;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray(); 
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: 'i'}
        });
    }

    async findById(id) {
        return await this.find({
            _id: ObjectId.isValid(id)? ObjectId.createFromHexString(id) :null
        })
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id)? ObjectId.createFromHexString(id):null
        }
        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: 'after'}
        )
        return result;
    }

    async delete(id) {
        const filter = {
            _id: ObjectId.isValid(id)? ObjectId.createFromHexString(id):null
        }
        const result = await this.Contact.findOneAndDelete(
            filter
        )
        return result;
    }

    async findFavorite() {
        const cursor = this.Contact.find({ favorite: true });
        const results = await cursor.toArray();
        return results;
   }
    async deleteAll() {
        const result = await this.Contact.deleteMany({});  
        return result.deletedCount; 
    }
}

module.exports = ContactService;