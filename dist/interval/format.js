"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const insertMaybe_1 = require("../common/insertMaybe");
const DEFAULT_INTERVAL_OPTIONS_1 = require("./default/DEFAULT_INTERVAL_OPTIONS");
exports.default = (options) => ({ from, to, reference }) => {
    const { timezone, format } = DEFAULT_INTERVAL_OPTIONS_1.setDefaultIntervalOptions(options);
    return Object.assign({ from: moment
            .tz(from, timezone)
            .tz(format.timezone)
            .format(format.date) }, insertMaybe_1.default({ reference }), { to: moment
            .tz(to, timezone)
            .tz(format.timezone)
            .format(format.date) });
};
