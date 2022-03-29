"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
exports.default = (target, interval) => moment.duration(interval.to.diff(interval.from)).asMinutes() >= target;
