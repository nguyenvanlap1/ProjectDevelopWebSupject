const { ObjectId } = require('mongodb');

class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection('nhanvien');
    }

    // Định nghĩa các phương thức
extractNhanVienData(payload) {
    // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
    if (!payload.hotennv || !payload.password || !payload.chucvu || !payload.diachi || !payload.sodienthoai) {
        throw new Error("Missing required fields: 'hotennv', 'password', 'chucvu', 'diachi', and/or 'sodienthoai'");
    }

    const nhanvien = {
        hotennv: payload.hotennv,
        password: payload.password,
        chucvu: payload.chucvu,
        diachi: payload.diachi,
        sodienthoai: payload.sodienthoai
    };

    return nhanvien;
}

async create(payload) {
    try {
        const nhanvien = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            nhanvien,
            {},
            { returnDocument: 'after', upsert: true }
        );
        return result;
    } catch (error) {
        throw new Error(`Failed to create: ${error.message}`);
    }
}

    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            hotennv: { $regex: new RegExp(new RegExp(name)), $options: 'i' }
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
        const update = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
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
        const result = await this.NhanVien.findOneAndDelete(
            filter
        );
        return result;
    }

    async deleteAll() {
        const result = await this.NhanVien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanVienService;
