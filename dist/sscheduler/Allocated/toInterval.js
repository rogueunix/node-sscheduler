"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
exports.default = (allocated) => allocated.map(({ from, duration }) => ({
    from: moment(from).format(),
    to: moment(from)
        .add(duration, 'minutes')
        .format()
}));
