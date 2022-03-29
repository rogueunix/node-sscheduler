"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
const DEFAULT_TIMEZONE = 'UTC';
exports.DEFAULT_INTERVAL_OPTIONS = Object.freeze({
    format: Object.freeze({
        date: DEFAULT_DATE_FORMAT,
        timezone: DEFAULT_TIMEZONE
    }),
    timezone: DEFAULT_TIMEZONE
});
exports.setDefaultIntervalOptions = (overrides) => overrides
    ? {
        format: {
            date: (overrides.format || {}).date ||
                exports.DEFAULT_INTERVAL_OPTIONS.format.date,
            timezone: (overrides.format || {}).timezone ||
                exports.DEFAULT_INTERVAL_OPTIONS.format.timezone
        },
        timezone: overrides.timezone || exports.DEFAULT_INTERVAL_OPTIONS.timezone
    }
    : exports.DEFAULT_INTERVAL_OPTIONS;
