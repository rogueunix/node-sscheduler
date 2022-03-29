"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Interval = require("../interval");
const normalizeMaybe_1 = require("./normalizeMaybe");
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
const intersectAll = (availabilities) => availabilities.slice(1).reduce((acc, intervals) => {
    const uniques = new Set(acc.map(interval => interval.from));
    return intervals.filter(interval => uniques.has(interval.from));
}, availabilities[0]);
exports.default = (params) => {
    const { schedules, normalize = false, parseTimezone = 'UTC', displayTimezone = 'UTC', dateFormat = DEFAULT_DATE_FORMAT } = params, scheduleParams = __rest(params, ["schedules", "normalize", "parseTimezone", "displayTimezone", "dateFormat"]);
    const availabilities = schedules.map(schedule => _1.getAvailabilities(Object.assign({}, scheduleParams, { dateFormat, normalize: false, parseTimezone,
        schedule })));
    return normalizeMaybe_1.normalizeMaybe(normalize)(intersectAll(availabilities).map(Interval.format({
        format: { timezone: displayTimezone, date: dateFormat },
        timezone: parseTimezone
    })), {
        format: {
            date: dateFormat,
            timezone: displayTimezone
        },
        timezone: parseTimezone
    });
};
