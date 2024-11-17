const { ObjectId } = require('mongodb');

class DocGiaService {
    constructor(client) {
        this.DocGia = client.db().collection('docgia');
    }

    // Định nghĩa các phương thức
extractDocGiaData(payload) {
    // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
    if (!payload.holot || !payload.ten || !payload.ngaysinh || !payload.phai || !payload.diachi || !payload.dienthoai) {
        throw new Error("Missing required fields: 'holot', 'ten', 'ngaysinh', 'phai', 'diachi', and/or 'dien'");
    }

    const docgia = {
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
        const docgia = this.extractDocGiaData(payload);
        const result = await this.DocGia.findOneAndUpdate(
            docgia,
            {$set: docgia},
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

    async deleteAll() {
        const result = await this.DocGia.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DocGiaService;
