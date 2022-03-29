"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const flatMap_1 = require("../../common/flatMap");
const repeat_1 = require("../../common/repeat");
const Schedule_1 = require("../Schedule");
const createMomentInterval = (newDay, momentRange, { from, to }) => ({
    from: moment.max(newDay
        .clone()
        .hour(from.hour)
        .minute(from.minute)
        .second(0)
        .millisecond(0), momentRange.from),
    to: moment.min(newDay
        .clone()
        .dayOfYear(newDay.dayOfYear() +
        +moment(`${from.hour}:${from.minute}`, 'hh:mm').isAfter(moment(`${to.hour}:${to.minute}`, 'hh:mm')))
        .hour(to.hour)
        .minute(to.minute)
        .second(0)
        .millisecond(0), momentRange.to)
});
const getScheduleOnDay = (day, dailyScheduleMinsHrs, momentRange, getFormattedInterval) => {
    const scheduleMinsHrs = dailyScheduleMinsHrs[day.weekday()];
    if (!scheduleMinsHrs)
        return Schedule_1.getEmptySchedule();
    return {
        availability: getFormattedInterval(scheduleMinsHrs.from &&
            scheduleMinsHrs.to &&
            createMomentInterval(day, momentRange, scheduleMinsHrs)),
        unavailability: flatMap_1.default(getFormattedInterval, scheduleMinsHrs.unavailability.map(interval => createMomentInterval(day, momentRange, interval)))
    };
};
exports.default = (dailyScheduleMinsHrs, getFormattedInterval, momentRange, daysInRange, timezone) => repeat_1.default(daysInRange).reduce((acc, dayIndex) => {
    const { availability, unavailability } = getScheduleOnDay(momentRange.from
        .clone()
        .add(dayIndex, 'days')
        .tz(timezone), dailyScheduleMinsHrs, momentRange, getFormattedInterval);
    return {
        availability: [...acc.availability, ...availability],
        unavailability: [...acc.unavailability, ...unavailability]
    };
}, Schedule_1.getEmptySchedule());
