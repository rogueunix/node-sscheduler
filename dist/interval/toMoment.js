"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const isMomentInterval = (interval) => moment.isMoment(interval.from) && moment.isMoment(interval.to);
exports.default = (interval, timezone) => {
    const setTimezoneMaybe = timezone
        ? (momentDate) => momentDate.tz(timezone)
        : (I) => I;
    if (isMomentInterval(interval))
        return interval;
    const [from, to] = [interval.from, interval.to].map(date => setTimezoneMaybe(moment(date)));
    return {
        from,
        reference: interval.reference,
        to
    };
};
