"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (a, b) => a && b ? a.to.diff(a.from, 'minutes') >= b.to.diff(b.from, 'minutes') : !a;
