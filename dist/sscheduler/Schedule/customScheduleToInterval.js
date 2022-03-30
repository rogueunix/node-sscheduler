"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const Interval = require("../../interval");
exports.default = (customSchedule, options) => {
    moment.tz.setDefault(options.timezone);
    return customSchedule.map(({ from, to, date }) => Interval.format(options)({
        from: `${date}T${from}`,
        to: `${date}T${to}`
    }));
};
