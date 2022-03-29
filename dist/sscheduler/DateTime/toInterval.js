"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
exports.default = (intervalsOrDateTime) => intervalsOrDateTime.map(interval => _1.isDateTime(interval)
    ? {
        from: `${interval.date}T${interval.from}`,
        to: `${interval.date}T${interval.to}`
    }
    : interval);
