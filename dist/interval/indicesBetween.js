"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
exports.default = ([...sortedIntervals], targetRange) => [
    sortedIntervals.findIndex(interval => moment(interval.to).isAfter(targetRange.from)),
    sortedIntervals
        .reverse()
        .findIndex(interval => moment(interval.from).isBefore(targetRange.to))
];
