"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatten_1 = require("./flatten");
exports.default = (fn, xs) => flatten_1.default(xs.map(fn));
