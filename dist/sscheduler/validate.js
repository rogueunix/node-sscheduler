"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const ISO8601 = (date, name, context) => {
    if (!moment(date, moment.ISO_8601).isValid()) {
        throw new Error(`${context ? context + ' ' : ''}"${name}" must be a valid ISO 8601 string`);
    }
};
const time = (time, name, context) => {
    if (!moment(time, 'hh:mm').isValid()) {
        throw new Error(`${context ? context + ' ' : ''}"${name}" must be a time in the format HH:mm`);
    }
};
const greaterThan = (from, to, context) => {
    if (!moment(from, moment.ISO_8601).isBefore(to)) {
        throw new Error(`${context ? context + ' ' : ''}"to" must be greater than "from"`);
    }
};
const greaterThanTime = (from, to, context) => {
    if (!moment(from, 'hh:mm').isBefore(moment(to, 'hh:mm'))) {
        throw new Error(`${context ? context + ' ' : ''}"to" must be greater than "from"`);
    }
};
const positiveInteger = (duration, name, context) => {
    if (!(Number.isInteger(duration) && duration >= 0)) {
        throw new Error(`${context ? context + ' ' : ''}"${name}" must be a positive integer`);
    }
};
exports.range = (from, to) => {
    ISO8601(from, 'from', '');
    ISO8601(to, 'to', '');
    greaterThan(from, to, '');
};
exports.unavailability = (unavailability) => {
    const validateOne = (from, to, date) => {
        if (!date) {
            ISO8601(from, 'from', 'unavailability');
            ISO8601(to, 'to', 'unavailability');
            greaterThan(from, to, 'unavailability');
        }
        else {
            ISO8601(date, 'date', 'unavailability');
            time(from, 'from', 'unavailability');
            time(to, 'to', 'unavailability');
            greaterThanTime(from, to, 'unavailability');
        }
    };
    unavailability.forEach(one => validateOne(one.from, one.to, one.date));
};
exports.allocated = (allocated) => {
    allocated.forEach(allocated => {
        ISO8601(allocated.from, 'allocated.from', '');
        positiveInteger(allocated.duration, 'allocated.duration', '');
    });
};
exports.interval = (interval) => {
    positiveInteger(interval, 'interval', '');
};
exports.duration = (duration) => {
    positiveInteger(duration, 'duration', '');
};
exports.timetable = (timetable) => {
    const validateDay = (day, timetable) => {
        if (timetable.from && timetable.to) {
            time(timetable.from, 'from', `${day}:`);
            time(timetable.to, 'to', `${day}:`);
        }
        if (timetable.unavailability) {
            timetable.unavailability.forEach(times => {
                time(times.from, 'from', `${day}: unavailability`);
                time(times.to, 'to', `${day}: unavailability`);
            });
        }
    };
    Object.keys(timetable).forEach((day) => validateDay(day, timetable[day]));
};
