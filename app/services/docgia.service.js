class DocGiaService {
    constructor(client) {
        this.DocGia = client.db().collection('docgia');
    }

    // Định nghĩa các phương thức trích xuất dữ liệu độc giả
    extractDocGiaData(payload) {
        // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
        if (!payload.madocgia || !payload.holot || !payload.ten || !payload.ngaysinh || !payload.phai || !payload.diachi || !payload.dienthoai) {
            throw new Error("Missing required fields: 'madocgia', 'holot', 'ten', 'ngaysinh', 'phai', 'diachi', and/or 'dienthoai'");
        }

        // Gán madocgia làm _id
        let _id = payload.madocgia;

        const docgia = {
            _id: _id, // Gán madocgia làm _id
            holot: payload.holot,
            ten: payload.ten,
            ngaysinh: payload.ngaysinh,
            phai: payload.phai,
            diachi: payload.diachi,
            dienthoai: payload.dienthoai
        };

        return docgia;
    }

    async create(payload) {
        try {
            const docgia = this.extractDocGiaData(payload); // Trích xuất dữ liệu đã kiểm tra tính hợp lệ

            const result = await this.DocGia.findOneAndUpdate(
                { _id: docgia._id }, // Sử dụng madocgia làm _id
                { $set: docgia },
                { returnDocument: 'after', upsert: true }
            );
            return result;
        } catch (error) {
            throw new Error(`Failed to create: ${error.message}`);
        }
    }

    async find(filter) {
        const cursor = await this.DocGia.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            ten: { $regex: new RegExp(name), $options: 'i' }
        });
    }

    async findById(id) {
        return await this.find({
            _id: id, // Sử dụng madocgia làm _id
        });
    }

    async update(id, payload) {
        try {
            if (!id) {
                throw new Error("Invalid 'id' format");
            }

            const filter = { _id: id }; // Sử dụng madocgia làm _id
            const update = this.extractDocGiaData(payload);

            const result = await this.DocGia.findOneAndUpdate(
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
            _id: id, // Sử dụng madocgia làm _id
        };
        const result = await this.DocGia.findOneAndDelete(filter);
        return result;
    }

    async deleteAll() {
        const result = await this.DocGia.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DocGiaService;
