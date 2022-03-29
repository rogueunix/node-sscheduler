"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insertMaybe_1 = require("../common/insertMaybe");
const repeat_1 = require("../common/repeat");
exports.default = (n, startDate, intervalMinutes, duration, reference) => {
    return repeat_1.default(n).map(index => {
        const from = startDate.clone().add(index * intervalMinutes, 'minutes');
        const to = from.clone().add(duration, 'minutes');
        return Object.assign({ from }, insertMaybe_1.default({ reference }), { to });
    });
};
