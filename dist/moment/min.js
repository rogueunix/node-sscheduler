"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
exports.default = (a, b) => (moment(a).isBefore(b) ? a : b);
