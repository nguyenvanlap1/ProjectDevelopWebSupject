const { ObjectId } = require('mongodb');

class MuonSachService {
    constructor(client) {
        this.MuonSach = client.db().collection('muonsach');
    }

    // Định nghĩa phương thức trích xuất dữ liệu mượn sách
    extractMuonSachData(payload) {
        const muonsach = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
            manhanvien: payload.manhanvien
        };

        Object.keys(muonsach).forEach((key) => {
            muonsach[key] === undefined && delete muonsach[key];
        });
        return muonsach;
    }

    async create(payload) {
        const muonsach = this.extractMuonSachData(payload);
        const result = await this.MuonSach.findOneAndUpdate(
            muonsach,
            {},
            { returnDocument: 'after', upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.MuonSach.find(filter);
        return await cursor.toArray();
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
        const update = this.extractMuonSachData(payload);
        const result = await this.MuonSach.findOneAndUpdate(
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
        const result = await this.MuonSach.findOneAndDelete(filter);
        return result;
    }

    async deleteAll() {
        const result = await this.MuonSach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = MuonSachService;
