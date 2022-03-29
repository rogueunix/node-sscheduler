"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (intervals) => intervals.reduce((acc, interval) => {
    const { from } = interval;
    const [day, time] = [from.format('YYYY-MM-DD'), from.format('HH:mm')];
    return Object.assign({}, acc, { [day]: [...new Set((acc[day] || []).concat(time))] });
}, {});
