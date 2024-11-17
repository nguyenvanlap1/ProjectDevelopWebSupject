const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error');
const nhaxuatbanRouter = require('./app/routes/nhaxuatban.route');
const sachRouter = require('./app/routes/sach.route');
const theodoimuonsachRouter = require('./app/routes/theodoimuonsach.route');
const nhanvienRouter = require('./app/routes/nhanvien.route');
const docgiaRouter = require('./app/routes/docgia.route');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to contactbook application." });
});

app.use('/api/nhaxuatban', nhaxuatbanRouter);
app.use('/api/sach', sachRouter);
app.use('/api/theodoimuonsach', theodoimuonsachRouter);
app.use('/api/nhanvien', nhanvienRouter);
app.use('/api/docgia', docgiaRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server Error",
    });
});

module.exports = app;
