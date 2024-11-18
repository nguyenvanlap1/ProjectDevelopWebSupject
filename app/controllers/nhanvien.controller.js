const bcrypt = require('bcryptjs');
const MongoDB = require('../utils/mongodb.util');
const NhanVienService = require('../services/nhanvien.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => { 
    try {
        const nhanVienService = new NhanVienService(MongoDB.client); 
        
        // Hash the password before creating the employee record
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // Replace password with hashed password
        req.body.password = hashedPassword;
        
        const result = await nhanVienService.create(req.body); 
        res.status(201).send(result); 
    } 
    catch (error) { 
        return next(new ApiError(500, error.message));
    }
}

exports.findAll = async (req, res, next) => {
    let results = [];
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const hotennv = req.body.hotennv;
        if (hotennv) {
            results = await nhanVienService.findByName(hotennv);
        } else {
            results = await nhanVienService.find({});
        }
        res.send(results);
    } catch (error) {
        return next(new ApiError(500, `An error occurred while retrieving employees: ${error}`));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const id = req.params.id;
        const result = await nhanVienService.findById(id);
        if (result.length === 0) {
            return next(new ApiError(404, "Employee not found"));
        }
        res.send(result);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving employee with id=${req.params.id}: ${error}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }
    
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        
        // Hash the password if it is included in the update
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;  // Replace with hashed password
        }

        const result = await nhanVienService.update(req.params.id, req.body);
        if (!result) {
            return next(new ApiError(404, 'Employee not found'));
        }
        return res.send(result);
    } catch (error) {
        return next(new ApiError(500, `Error updating employee with id=${req.params.id}: ${error}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const result = await nhanVienService.delete(req.params.id);
        if (!result) {
            return next(new ApiError(404, 'Employee not found'));
        }
        return res.send({ message: `Employee was deleted successfully` });
    } catch (error) {
        return next(new ApiError(500, `Could not delete employee with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) =>  {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const deleteCount = await nhanVienService.deleteAll();
        return res.send({
            message: `${deleteCount} employees were deleted successfully`
        });
    } catch (error) {
        return next(new ApiError(500, `An error occurred while removing all employees: ${error}`));
    }
};
