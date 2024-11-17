const { ObjectId } = require('mongodb');

class NhaXuatBanService {
    constructor(client) {
        this.NhaXuatBan = client.db().collection('nhaxuatban');
    }

    // Define methods below
    extractNhaXuatBanData(payload) {
    // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
    if (!payload.tennxb || !payload.diachi) {
        throw new Error("Missing required fields: 'tennxb' and/or 'diachi'");
    }

    const nhaxuatban = {
        tennxb: payload.tennxb,
        diachi: payload.diachi
    };

    return nhaxuatban;
    }

async create(payload) {
    try {
        const nhaxuatban = this.extractNhaXuatBanData(payload);
        const result = await this.NhaXuatBan.findOneAndUpdate(
            nhaxuatban,
            {},
            { returnDocument: 'after', upsert: true }
        );
        return result;
    } catch (error) {
        throw new Error(`Failed to create: ${error.message}`);
    }
}

    async find(filter) {
        const cursor = await this.NhaXuatBan.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tennxb: { $regex: new RegExp(new RegExp(name)), $options: 'i' }
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
        const update = this.extractNhaXuatBanData(payload);
        const result = await this.NhaXuatBan.findOneAndUpdate(
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
        const result = await this.NhaXuatBan.findOneAndDelete(
            filter
        );
        return result;
    }

    async deleteAll() {
        const result = await this.NhaXuatBan.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhaXuatBanService;
