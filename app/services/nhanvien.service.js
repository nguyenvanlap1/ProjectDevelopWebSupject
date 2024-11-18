class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection('nhanvien');
    }

    // Định nghĩa các phương thức trích xuất dữ liệu nhân viên
    extractNhanVienData(payload) {
        // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
        if (!payload.hotennv || !payload.chucvu || !payload.diachi || !payload.sodienthoai || payload.msnv === undefined) {
            throw new Error("Missing required fields: 'msnv', 'hotennv', 'chucvu', 'diachi', and/or 'sodienthoai'");
        }

        // Gán msnv làm _id
        let _id = payload.msnv;

        const nhanvien = {
            _id: _id, // Gán msnv làm _id
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
            if(!payload.password) {
                throw new Error("Missing required fields: password");
            }
            const nhanvien = this.extractNhanVienData(payload); // Trích xuất dữ liệu đã kiểm tra tính hợp lệ

            const result = await this.NhanVien.findOneAndUpdate(
                { _id: nhanvien._id }, // Sử dụng msnv làm _id
                { $set: nhanvien },
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
            hotennv: { $regex: new RegExp(name), $options: 'i' }
        });
    }

    async findById(id) {
        return await this.find({
            _id: id, // Sử dụng msnv làm _id
        });
    }

    async update(id, payload) {
        try {
            if (!id) {
                throw new Error("Invalid 'id' format");
            }

            const filter = { _id: id }; // Sử dụng msnv làm _id
            const update = this.extractNhanVienData(payload);

            const result = await this.NhanVien.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: 'after' }
            );
            return result;
        } catch (error) {
            throw new Error(`Failed to update: ${error.message}`);
        }
    }

    async delete(id) {
        const filter = {
            _id: id, // Sử dụng msnv làm _id
        };
        const result = await this.NhanVien.findOneAndDelete(filter);
        return result;
    }

    async deleteAll() {
        const result = await this.NhanVien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanVienService;
