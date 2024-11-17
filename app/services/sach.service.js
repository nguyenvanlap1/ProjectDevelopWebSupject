const { ObjectId } = require('mongodb');

class SachService {
    constructor(client) {
        this.Sach = client.db().collection('sach');
    }

    // Định nghĩa lại phương thức trích xuất dữ liệu sách
extractSachData(payload) {
    // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
    if (!payload.tensach || !payload.dongia || !payload.soquyen || !payload.namxuatban || !payload.manhaxuatban || !payload.nguongoc_tacgia) {
        throw new Error("Missing required fields: 'tensach', 'dongia', 'soquyen', 'namxuatban', 'manhaxuatban', and/or 'nguongoc_tacgia'");
    }

    const sach = {
        tensach: payload.tensach,
        dongia: payload.dongia,
        soquyen: payload.soquyen,
        namxuatban: payload.namxuatban,
        manhaxuatban: payload.manhaxuatban,
        nguongoc_tacgia: payload.nguongoc_tacgia
    };

    return sach;
}

async create(payload) {
    try {
        const sach = this.extractSachData(payload);
        const result = await this.Sach.findOneAndUpdate(
            sach,
            {$set: sach},
            { returnDocument: 'after', upsert: true }
        );
        return result;
    } catch (error) {
        throw new Error(`Failed to create: ${error.message}`);
    }
}

    async find(filter) {
        const cursor = await this.Sach.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tensach: { $regex: new RegExp(name), $options: 'i' }
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
        const update = this.extractSachData(payload);
        const result = await this.Sach.findOneAndUpdate(
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
        const result = await this.Sach.findOneAndDelete(filter);
        return result;
    }

    async deleteAll() {
        const result = await this.Sach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = SachService;
