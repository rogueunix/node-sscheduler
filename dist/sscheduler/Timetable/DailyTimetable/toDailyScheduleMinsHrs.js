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
const MinsHrs_1 = require("../../MinsHrs");
const const_1 = require("../../const");
const timetableToScheduleMinsHrs = (_a) => {
    var { unavailability = [] } = _a, availability = __rest(_a, ["unavailability"]);
    return (Object.assign({}, MinsHrs_1.intervalToMinsHrs(availability), { unavailability: unavailability.map(unavailability => MinsHrs_1.intervalToMinsHrs(unavailability)) }));
};
exports.default = (times) => Object.keys(times).reduce((acc, dayOfTheWeek) => (Object.assign({}, acc, { [const_1.DAYS_OF_THE_WEEK.indexOf(dayOfTheWeek.toUpperCase())]: timetableToScheduleMinsHrs(times[dayOfTheWeek]) })), {});
