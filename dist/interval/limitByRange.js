"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const insertMaybe_1 = require("../common/insertMaybe");
exports.default = (intervals, range) => {
    return intervals.reduce((acc, interval) => [
        ...acc,
        ...[
            Object.assign({ from: moment.max(interval.from, range.from) }, insertMaybe_1.default({ reference: interval.reference }), { to: moment.min(interval.to, range.to) })
        ].filter(interval => interval.from.isBefore(interval.to))
    ], []);
};
