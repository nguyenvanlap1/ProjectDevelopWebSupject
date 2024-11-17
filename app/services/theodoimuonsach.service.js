const { ObjectId } = require('mongodb');

class MuonSachService {
    constructor(client) {
        this.MuonSach = client.db().collection('muonsach');
    }

    // Định nghĩa phương thức trích xuất dữ liệu mượn sách
extractMuonSachData(payload) {
    // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
    if (!payload.madocgia || !payload.masach || !payload.ngaymuon || !payload.ngaytra || !payload.manhanvien) {
        throw new Error("Missing required fields: 'madocgia', 'masach', 'ngaymuon', 'ngaytra', and/or 'manhanvien'");
    }

    const muonsach = {
        madocgia: payload.madocgia,
        masach: payload.masach,
        ngaymuon: payload.ngaymuon,
        ngaytra: payload.ngaytra,
        manhanvien: payload.manhanvien
    };

    return muonsach;
}

async create(payload) {
    try {
        const muonsach = this.extractMuonSachData(payload);
        const result = await this.MuonSach.findOneAndUpdate(
            muonsach,
            {$set: muonsach},
            { returnDocument: 'after', upsert: true }
        );
        return result;
    } catch (error) {
        throw new Error(`Failed to create: ${error.message}`);
    }
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
