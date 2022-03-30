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
const moment = require("moment-timezone");
const Interval = require("../interval");
const DEFAULT_INTERVAL_OPTIONS_1 = require("../interval/default/DEFAULT_INTERVAL_OPTIONS");
const Allocated = require("./Allocated");
const DateTime = require("./DateTime");
const getFreeTimeSlots_1 = require("./getFreeTimeSlots");
const normalizeMaybe_1 = require("./normalizeMaybe");
const customScheduleToInterval_1 = require("./Schedule/customScheduleToInterval");
const toSchedule_1 = require("./Timetable/toSchedule");
const Validate = require("./validate");
const DEFAULT_INTERVAL = 0;
const DEFAULT_DURATION = 0;
exports.default = (_a) => {
    var { from, to } = _a, _b = _a.schedule, { availability = [], unavailability = [], allocated = [], custom_schedule = [], weekdays } = _b, dailyTimetable = __rest(_b, ["availability", "unavailability", "allocated", "custom_schedule", "weekdays"]), { interval = DEFAULT_INTERVAL, duration = DEFAULT_DURATION, showUnavailable = false, normalize = false, parseTimezone, displayTimezone, dateFormat } = _a;
    const userFormatOptions = DEFAULT_INTERVAL_OPTIONS_1.setDefaultIntervalOptions({
        format: {
            date: dateFormat,
            timezone: displayTimezone
        },
        timezone: parseTimezone
    });
    const defaultFormatOptions = DEFAULT_INTERVAL_OPTIONS_1.setDefaultIntervalOptions({
        timezone: parseTimezone
    });
    moment.tz.setDefault(userFormatOptions.timezone);
    validateParams(from, to, interval, duration, unavailability, allocated);
    const { availabilities, unavailabilities } = removeAllOverlaps(parseTimetables(weekdays, from, to, defaultFormatOptions, dailyTimetable), customScheduleToInterval_1.default(custom_schedule, defaultFormatOptions), availability, DateTime.toInterval(unavailability), Allocated.toInterval(allocated), defaultFormatOptions);
    const freeTimeSlots = getFreeTimeSlots_1.getFreeTimeSlots(availabilities, unavailabilities, { from, to }, Math.max(duration, interval), defaultFormatOptions);
    return showUnavailable
        ? getTimeAvailabilities({ from, to }, freeTimeSlots, interval, duration, userFormatOptions)
        : normalizeMaybe_1.normalizeMaybe(normalize)(Interval.partition(freeTimeSlots, interval, duration, userFormatOptions), userFormatOptions);
};
const getTimeAvailabilities = (range, freeTimeSlots, intervalSliceMinutes, duration, options) => {
    const rangeIntervals = Interval.partition(range, intervalSliceMinutes, duration, options);
    const availabilitiesByDay = Interval.byDay(Interval.partition(freeTimeSlots, intervalSliceMinutes, duration, options), options);
    const getTimeAndDay = (day) => {
        const momentDay = moment(day);
        return {
            date: momentDay.format('YYYY-MM-DD'),
            time: momentDay.format('HH:mm')
        };
    };
    return rangeIntervals.reduce((byDay, interval) => {
        const { date, time } = getTimeAndDay(interval.from);
        const timeAvailability = {
            available: (availabilitiesByDay[date] || []).some(_time => _time === time),
            time
        };
        return Object.assign({}, byDay, { [date]: (byDay[date] || []).concat(timeAvailability) });
    }, {});
};
const validateParams = (from, to, interval, duration, unavailability, allocated) => {
    Validate.range(from, to);
    Validate.interval(interval);
    Validate.duration(duration);
    Validate.unavailability(unavailability);
    Validate.allocated(allocated);
};
const _removeOverlaps = (options) => (...intervalSets) => intervalSets
    .slice(1)
    .reduce((acc, intervals) => intervals.concat(acc.filter(interval => !intervals.some(overrideInterval => Interval.hasIntersection(interval, overrideInterval, options)))), intervalSets[0]);
const removeAllOverlaps = ({ weeklySchedule, dailySchedule }, customSchedule, availability, unavailability, allocated, defaultFormatOptions) => {
    const removeOverlaps = _removeOverlaps(defaultFormatOptions);
    return {
        availabilities: removeOverlaps(weeklySchedule.availability, dailySchedule.availability, availability, customSchedule),
        unavailabilities: removeOverlaps(weeklySchedule.unavailability, dailySchedule.unavailability, unavailability, allocated)
    };
};
const parseTimetables = (weekdays, from, to, defaultFormatOptions, dailyTimetable) => ({
    dailySchedule: toSchedule_1.default(dailyTimetable, { from, to }, defaultFormatOptions),
    weeklySchedule: toSchedule_1.default(weekdays && { weekdays }, { from, to }, defaultFormatOptions)
});
