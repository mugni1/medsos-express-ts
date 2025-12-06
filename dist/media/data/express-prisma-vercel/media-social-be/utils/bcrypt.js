"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashedPassword = exports.comparePassword = void 0;
const bcrypt_ts_1 = require("bcrypt-ts");
const comparePassword = async (password, hash) => {
    return (0, bcrypt_ts_1.compareSync)(password, hash);
};
exports.comparePassword = comparePassword;
const hashedPassword = (password) => {
    return (0, bcrypt_ts_1.hashSync)(password, (0, bcrypt_ts_1.genSaltSync)(10));
};
exports.hashedPassword = hashedPassword;
