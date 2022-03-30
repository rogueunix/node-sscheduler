"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interval = require("../interval");
exports.normalizeMaybe = (normalize) => normalize ? Interval.byDay : I => I;
