const bcrypt = require('bcryptjs');
const MongoDB = require('../utils/mongodb.util');
const NhanVienService = require('../services/nhanvien.service');
const ApiError = require('../api-error');

exports.login = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        
        // Retrieve employee by msnv (username or employee id)
        const { msnv, password } = req.body; // Assuming msnv is used as the username
        const employee = await nhanVienService.findById(msnv);
        
        if (employee.length === 0) {
            return next(new ApiError(404, "Employee not found"));
        }

        // Compare entered password with stored hashed password
        const passwordMatch = await bcrypt.compare(password, employee[0].password);
        
        if (!passwordMatch) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        // Store user details in session
        req.session.user = {
            msnv: employee[0]._id,
            hotennv: employee[0].hotennv,
            chucvu: employee[0].chucvu
        };

        res.status(200).send(
            req.session.user
        );
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
};

exports.logout = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(new ApiError(500, "Failed to logout"));
            }

            res.status(200).send({ message: "Logged out successfully" });
        });
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
};

exports.checkLogin = (req, res, next) => {
    if (req.session.user) {
        // If the user is logged in, return a success message along with user info
        return res.status(200).send(
            req.session.user
        );
    } else {
        // If no session exists, return an error message
        return res.status(401).send({
            message: "User is not logged in"
        });
    }
};

