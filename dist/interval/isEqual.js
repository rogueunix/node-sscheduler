"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (a, b) => a && b ? a.to.isSame(b.to) && a.from.isSame(b.from) : !(a || b);
