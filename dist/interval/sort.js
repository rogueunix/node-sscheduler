"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ([...intervals], reverse = false) => intervals.sort((a, b) => Math.pow((-1), +(reverse || false)) * a.from.diff(b.from));
