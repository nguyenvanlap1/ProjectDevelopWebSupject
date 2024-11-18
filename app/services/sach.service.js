const NhaXuatBanService = require('./nhaxuatban.service');
const { ObjectId } = require('mongodb');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');

class SachService {
    constructor(client) {
        this.Sach = client.db().collection('sach');
    }

    // Định nghĩa lại phương thức trích xuất dữ liệu sách
    async extractSachData(payload) {
        // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
        if (!payload.masach || !payload.tensach || !payload.dongia || !payload.soquyen || !payload.namxuatban || !payload.manhaxuatban || !payload.nguongoc_tacgia) {
            throw new ApiError(400, "Missing required fields: 'masach', 'tensach', 'dongia', 'soquyen', 'namxuatban', 'manhaxuatban', and/or 'nguongoc_tacgia'");
        }
        
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        if ((await nhaxuatbanService.findById(payload.manhaxuatban)).length === 0) {
            throw new ApiError(404, `NXB not found with id: ${payload.manhaxuatban}`);
        }

        // Gán masach làm _id
        const sach = {
            _id: payload.masach, // Gán masach làm _id
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
            const sach = await this.extractSachData(payload); // Thêm 'await' để đợi hoàn tất
            const result = await this.Sach.findOneAndUpdate(
                { _id: sach._id }, // Sử dụng masach làm _id
                { $set: sach },
                { returnDocument: 'after', upsert: true }
            );
            return result;
        } catch (error) {
            throw new ApiError(500, `Failed to create: ${error.message}`);
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
            _id: id // Sử dụng masach làm _id
        });
    }

    async update(id, payload) {
        try {
            // Kiểm tra masach hợp lệ
            if (!id) {
                throw new ApiError(400, "Invalid 'masach' format");
            }

            const filter = { _id: id }; // Sử dụng masach làm _id
            const update = await this.extractSachData(payload); // Thêm 'await' để đợi hoàn tất
            const result = await this.Sach.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: 'after' }
            );
            return result;
        } catch (error) {
            throw new ApiError(500, `Failed to update: ${error.message}`);
        }
    }

    async delete(id) {
        const filter = {
            _id: id // Sử dụng masach làm _id
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
