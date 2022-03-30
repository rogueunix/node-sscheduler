"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const interval_1 = require("../../interval");
const dailyScheduleMinsHrsToSchedule_1 = require("../MinsHrs/dailyScheduleMinsHrsToSchedule");
const Schedule_1 = require("../Schedule");
const validate = require("../validate");
const dailyTimetable = require("./DailyTimetable");
const weeklyTimetable = require("./WeeklyTimetable");
exports.default = (timetable, range, options) => {
    if (!timetable)
        return Schedule_1.getEmptySchedule();
    validate.timetable(timetable);
    const formatInterval = interval_1.format(options);
    const getFormattedInterval = (interval) => interval && interval.from.isBefore(interval.to)
        ? [formatInterval(interval)]
        : [];
    const momentRange = interval_1.toMoment(range, options.timezone);
    const daysInRange = momentRange.to
        .clone()
        .startOf('day')
        .diff(momentRange.from.clone().startOf('day'), 'days') + 1;
    if (daysInRange <= 0)
        return Schedule_1.getEmptySchedule();
    const dailyScheduleMinsHrs = dailyTimetable.toDailyScheduleMinsHrs(_1.isWeeklyTimetable(timetable)
        ? weeklyTimetable.toDailyTimetable(timetable)
        : timetable);
    return dailyScheduleMinsHrsToSchedule_1.default(dailyScheduleMinsHrs, getFormattedInterval, momentRange, daysInRange, options.timezone);
};
