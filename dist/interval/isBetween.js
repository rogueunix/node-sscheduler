"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (a, b, inclusive = false) => !!a &&
    !!b &&
    a.from[inclusive ? 'isSameOrBefore' : 'isBefore'](b.from) &&
    a.to[inclusive ? 'isSameOrAfter' : 'isAfter'](b.to);
