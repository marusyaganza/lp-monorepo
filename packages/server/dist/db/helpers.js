"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFilter = exports.formatData = void 0;
function formatData(data) {
    if (!data) {
        return null;
    }
    return data.toObject({
        getters: true,
        versionKey: false
    });
}
exports.formatData = formatData;
function formatFilter(filter) {
    const id = filter?.id;
    if (id) {
        const formattedFilter = { ...filter, _id: id };
        delete formattedFilter.id;
        return formattedFilter;
    }
    return filter;
}
exports.formatFilter = formatFilter;
//# sourceMappingURL=helpers.js.map