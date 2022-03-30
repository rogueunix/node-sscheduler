"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interval = require("../interval");
exports.getFreeTimeSlots = (availability, unavailability, targetRange, minimumInterval, options) => Interval.substract(Interval.limitByRange(availability, targetRange, options), unavailability, options).filter(interval => Interval.isGreaterOrEqualMinutes(minimumInterval, interval, options));
