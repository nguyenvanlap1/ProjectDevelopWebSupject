const { ObjectId } = require('mongodb');
const DocGiaService = require('./docgia.service');  // Importing the DocGiaService
const SachService = require('./sach.service');      // Importing the SachService
const NhanVienService = require('./nhanvien.service'); // Importing the NhanVienService
const MongoDB = require('../utils/mongodb.util');

class MuonSachService {
    constructor(client) {
        this.MuonSach = client.db().collection('muonsach');
    }

    // Định nghĩa phương thức trích xuất dữ liệu mượn sách
    async extractMuonSachData(payload) {
        // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
        if (!payload.madocgia || !payload.masach || !payload.ngaymuon || !payload.ngaytra || !payload.manhanvien) {
            throw new Error("Missing required fields: 'madocgia', 'masach', 'ngaymuon', 'ngaytra', and/or 'manhanvien'");
        }

        // Kiểm tra xem madocgia có tồn tại không
        const docgiaService = new DocGiaService(MongoDB.client);
        const docgia = await docgiaService.findById(payload.madocgia);
        if (docgia.length === 0) {
            throw new Error(`Reader not found with id: ${payload.madocgia}`);
        }

        // Kiểm tra xem masach có tồn tại không
        const sachService = new SachService(MongoDB.client);
        const sach = await sachService.findById(payload.masach);
        if (sach.length === 0) {
            throw new Error(`Book not found with id: ${payload.masach}`);
        }

        // Kiểm tra xem manhanvien có tồn tại không
        const nhanvienService = new NhanVienService(MongoDB.client);
        const nhanvien = await nhanvienService.findById(payload.manhanvien);
        if (nhanvien.length === 0) {
            throw new Error(`Employee not found with id: ${payload.manhanvien}`);
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
        // Tìm xem có tồn tại bản ghi với ngày mượn, mã độc giả và mã sách không
        const existingRecord = await this.MuonSach.findOne({
            ngaymuon: payload.ngaymuon,
            madocgia: payload.madocgia,
            masach: payload.masach
        });

        // Nếu đã tồn tại bản ghi, throw lỗi
        if (existingRecord) {
            throw new Error("Record already exists for this book, reader, and borrow date.");
        }

        // Trích xuất dữ liệu từ payload
        const muonsach = await this.extractMuonSachData(payload);

        // Tiến hành tạo hoặc cập nhật bản ghi mới
        const result = await this.MuonSach.findOneAndUpdate(
            { _id: new ObjectId() },  // Thêm _id mới nếu là bản ghi mới
            { $set: muonsach },
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
        const update = await this.extractMuonSachData(payload); // Thêm 'await' để đợi hoàn tất
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
