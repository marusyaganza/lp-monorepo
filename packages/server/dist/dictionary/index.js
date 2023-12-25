"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWord = void 0;
const searchWord_1 = require("./searchWord");
const mockSearchWord_1 = require("./mockSearchWord");
exports.searchWord = process.env.USE_MOCKS
    ? mockSearchWord_1.mockSearchWord
    : searchWord_1.searchWord;
//# sourceMappingURL=index.js.map