"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const User_1 = require("../schema/User");
const helpers_1 = require("../helpers");
exports.UserModel = {
    async findOne(filter = {}) {
        const user = await User_1.User.findOne((0, helpers_1.formatFilter)(filter));
        return (0, helpers_1.formatData)(user);
    },
    //TODO check this method when admin auth is ready
    async findMany(filter = {}) {
        const users = await User_1.User.find((0, helpers_1.formatFilter)(filter));
        return users;
    },
    async createOne(fields) {
        const createdAt = Date.now();
        const user = await User_1.User.create({ ...fields, createdAt });
        return (0, helpers_1.formatData)(user);
    },
    //TODO check this method when GQL for this is ready
    async updateOne(fields) {
        const update = { ...fields };
        delete update.id;
        const { ok, value } = await User_1.User.findByIdAndUpdate(fields.id, update, {
            includeResultMetadata: true,
            new: true
        });
        return { ok: Boolean(ok), value: (0, helpers_1.formatData)(value) };
    },
    //TODO check this method when admin auth is ready
    async deleteOne(filter) {
        const result = { ok: false };
        const { deletedCount, acknowledged } = await User_1.User.deleteOne((0, helpers_1.formatFilter)(filter));
        if (acknowledged && deletedCount == 1) {
            result.ok = true;
        }
        return result;
    }
};
//# sourceMappingURL=User.js.map