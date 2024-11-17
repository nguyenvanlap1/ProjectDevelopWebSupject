exports.create = async (req, res, next) => {
    try {
        res.send({ message: "create NXB" });
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        res.send({ message: "findAll NXB" });
    } catch (error) {
        next(error);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        res.send({ message: "findOne NXB" });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        res.send({ message: "update NXB" });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        res.send({ message: "delete NXB" });
    } catch (error) {
        next(error);
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        res.send({ message: "deleteAll NXB" });
    } catch (error) {
        next(error);
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        res.send({ message: "findAllFavorite NXB" });
    } catch (error) {
        next(error);
    }
};
