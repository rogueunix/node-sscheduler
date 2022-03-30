"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const DEFAULT_INTERVAL_OPTIONS_1 = require("./default/DEFAULT_INTERVAL_OPTIONS");
const byDay_1 = require("./byDay");
const createMany_1 = require("./createMany");
const format_1 = require("./format");
exports.format = format_1.default;
const hasIntersection_1 = require("./hasIntersection");
const indicesBetween_1 = require("./indicesBetween");
const intersect_1 = require("./intersect");
const isBetween_1 = require("./isBetween");
const isEqual_1 = require("./isEqual");
const isGreaterOrEqual_1 = require("./isGreaterOrEqual");
const isGreaterOrEqualMinutes_1 = require("./isGreaterOrEqualMinutes");
const limitByRange_1 = require("./limitByRange");
const partition_1 = require("./partition");
const sort_1 = require("./sort");
const substract_1 = require("./substract");
const toMoment_1 = require("./toMoment");
exports.toMoment = toMoment_1.default;
const isIntervals = (intervals) => typeof intervals[0].from === 'string' && typeof intervals[0].to === 'string';
const isInterval = (interval) => typeof interval.from === 'string' && typeof interval.to === 'string';
const toMomentIntervals = (intervals) => (intervals.length && isIntervals(intervals)
    ? intervals.map((interval) => toMoment_1.default(interval))
    : intervals);
function withTimezoneAndFormat(fn) {
    return (...args) => {
        const options = args.length <= fn.length
            ? DEFAULT_INTERVAL_OPTIONS_1.DEFAULT_INTERVAL_OPTIONS
            : DEFAULT_INTERVAL_OPTIONS_1.setDefaultIntervalOptions(args.pop());
        moment.tz.setDefault(options.timezone);
        moment.defaultFormat = moment.defaultFormatUtc = options.format.date;
        const transformedArgs = args.map(arg => Array.isArray(arg)
            ? toMomentIntervals(arg)
            : isInterval(arg)
                ? toMoment_1.default(arg)
                : arg);
        return fn(...transformedArgs).map(format_1.default(options));
    };
}
function withTimezone(fn) {
    const hasTimezone = (opts) => typeof opts.timezone === 'string';
    const getTimezone = (opts) => hasTimezone(opts)
        ? opts.timezone
        : typeof opts === 'string'
            ? opts
            : DEFAULT_INTERVAL_OPTIONS_1.DEFAULT_INTERVAL_OPTIONS.timezone;
    return (...args) => {
        const timezone = args.length <= fn.length
            ? DEFAULT_INTERVAL_OPTIONS_1.DEFAULT_INTERVAL_OPTIONS.timezone
            : getTimezone(args.pop()) || DEFAULT_INTERVAL_OPTIONS_1.DEFAULT_INTERVAL_OPTIONS.timezone;
        moment.tz.setDefault(timezone);
        const transformedArgs = args.map(arg => Array.isArray(arg)
            ? toMomentIntervals(arg)
            : isInterval(arg)
                ? toMoment_1.default(arg)
                : arg);
        return fn(...transformedArgs);
    };
}
const byDay = withTimezone(byDay_1.default);
exports.byDay = byDay;
const createMany = withTimezoneAndFormat(createMany_1.default);
exports.createMany = createMany;
const indicesBetween = withTimezone(indicesBetween_1.default);
exports.indicesBetween = indicesBetween;
const intersect = withTimezoneAndFormat(intersect_1.default);
exports.intersect = intersect;
const hasIntersection = withTimezone(hasIntersection_1.default);
exports.hasIntersection = hasIntersection;
const isBetween = withTimezone(isBetween_1.default);
exports.isBetween = isBetween;
const isEqual = withTimezone(isEqual_1.default);
exports.isEqual = isEqual;
const isGreaterOrEqual = withTimezone(isGreaterOrEqual_1.default);
exports.isGreaterOrEqual = isGreaterOrEqual;
const isGreaterOrEqualMinutes = withTimezone(isGreaterOrEqualMinutes_1.default);
exports.isGreaterOrEqualMinutes = isGreaterOrEqualMinutes;
const limitByRange = withTimezoneAndFormat(limitByRange_1.default);
exports.limitByRange = limitByRange;
const partition = withTimezoneAndFormat(partition_1.default);
exports.partition = partition;
const substract = withTimezoneAndFormat(substract_1.default);
exports.substract = substract;
const sort = (intervals, options, reverse = false) => withTimezone(sort_1.default)(intervals, options, reverse);
exports.sort = sort;
