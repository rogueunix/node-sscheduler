"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../../const");
exports.default = ({ weekdays: { from, to, unavailability } }) => const_1.WEEKDAYS.reduce((acc, day) => (Object.assign({}, acc, { [day]: { from, to, unavailability } })), {});
