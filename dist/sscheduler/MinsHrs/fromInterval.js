"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
exports.default = (interval) => ({
    from: {
        hour: moment(interval.from, 'hh:mm').hour(),
        minute: moment(interval.from, 'hh:mm').minute()
    },
    to: {
        hour: moment(interval.to, 'hh:mm').hour(),
        minute: moment(interval.to, 'hh:mm').minute()
    }
});
