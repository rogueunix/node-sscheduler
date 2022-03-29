"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isBetween_1 = require("./isBetween");
exports.default = (a, b) => isBetween_1.default(a, b) ||
    a.from.isBetween(b.from, b.to, 'minutes', '[)') ||
    a.to.isBetween(b.from, b.to, 'minutes', '(]');
