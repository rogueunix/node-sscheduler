"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sscheduler_1 = require("./sscheduler");
const getAvailabilities_1 = require("./sscheduler/getAvailabilities");
exports.getAvailabilities = getAvailabilities_1.default;
class Scheduler {
    getAvailability(params) {
        return getAvailabilities_1.default(Object.assign({ normalize: true, showUnavailable: true }, params));
    }
    getIntersection(params) {
        return sscheduler_1.getIntersection(Object.assign({ normalize: true }, params));
    }
}
exports.Scheduler = Scheduler;
