"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (obj) => {
    const key = Object.keys(obj).pop();
    return key && obj[key] !== undefined ? obj : {};
};
