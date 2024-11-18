const ApiError = require('../api-error');

exports.protected = (req, res, next) => {
    if (!req.session.user) {
        return next(new ApiError(403, "Unauthorized access"));
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.chucvu === 'admin') {
        return next(); // User is an admin, proceed to the route
    }
    return next(new ApiError(403, "Access denied. Admins only"));
};
