const { ObjectId } = require('mongodb');

class DocGiaService {
    constructor(client) {
        this.DocGia = client.db().collection('docgia');
    }

    // Define methods below
    extractDocGiaData(payload) {
        const docgia = {
            holot: payload.holot,
            ten: payload.ten,
            ngaysinh: payload.ngaysinh,
            phai: payload.phai,
            diachi: payload.diachi,
            dien: payload.dien,
            favorite: payload.favorite
        };

        Object.keys(docgia).forEach((key) => {
            docgia[key] === undefined && delete docgia[key];
        });
        return docgia;
    }

    async create(payload) {
        const docgia = this.extractDocGiaData(payload);
        const result = await this.DocGia.findOneAndUpdate(
            docgia,
            { $set: { favorite: docgia.favorite === true } },
            { returnDocument: 'after', upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.DocGia.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            ten: { $regex: new RegExp(new RegExp(name)), $options: 'i' }
        });
    }

    async findById(id) {
        return await this.find({
            _id: ObjectId.isValid(id) ? ObjectId.createFromHexString(id) : null
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? ObjectId.createFromHexString(id) : null
        };
        const update = this.extractDocGiaData(payload);
        const result = await this.DocGia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result;
    }

    async delete(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? ObjectId.createFromHexString(id) : null
        };
        const result = await this.DocGia.findOneAndDelete(
            filter
        );
        return result;
    }

    async findFavorite() {
        const cursor = this.DocGia.find({ favorite: true });
        const results = await cursor.toArray();
        return results;
    }

    async deleteAll() {
        const result = await this.DocGia.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DocGiaService;
