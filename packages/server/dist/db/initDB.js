"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("./models");
const connectStr = process.env.MONGO_CONNECTION || 'mongodb://lp-db:27017';
const initDB = async function (cb, connectString = connectStr) {
    (0, mongoose_1.connect)(connectString)
        .then(() => {
        cb(models_1.models);
    })
        .catch(err => console.log(err));
};
exports.initDB = initDB;
//# sourceMappingURL=initDB.js.map