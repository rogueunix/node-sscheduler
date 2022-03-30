"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatMap_1 = require("../common/flatMap");
const flatten_1 = require("../common/flatten");
const insertMaybe_1 = require("../common/insertMaybe");
const createMany_1 = require("./createMany");
const sort_1 = require("./sort");
const validateIntervalSlice = (interval) => {
    if (!(60 % (interval % 60)))
        return true;
    throw new Error('interval should evenly partition an hour!');
};
const partitionOne = ({ from, to, reference }, intervalSliceMinutes, duration) => {
    validateIntervalSlice(intervalSliceMinutes);
    const earliestStartDate = (() => {
        const nextStartPartitionIndex = Math.ceil(from.minute() / intervalSliceMinutes) * intervalSliceMinutes;
        return from.add(nextStartPartitionIndex - from.minute(), 'minutes');
    })();
    const numberOfPartitions = (() => {
        const totalDuration = to.diff(earliestStartDate, 'minutes');
        return (Math.min(totalDuration - duration + intervalSliceMinutes, totalDuration) /
            intervalSliceMinutes);
    })();
    const intervals = createMany_1.default(~~numberOfPartitions, earliestStartDate, intervalSliceMinutes, duration, reference);
    const rest = (() => {
        if (~~numberOfPartitions === numberOfPartitions)
            return [];
        const dateFrom = earliestStartDate
            .clone()
            .add(~~numberOfPartitions * intervalSliceMinutes + duration, 'minutes');
        return to.diff(dateFrom, 'minutes') >= duration
            ? [
                Object.assign({ from: dateFrom }, insertMaybe_1.default({ reference }), { to })
            ]
            : [];
    })();
    return [...intervals, ...rest];
};
const partitionMany = (intervals, intervalSliceMinutes, duration) => flatMap_1.default(interval => partitionOne(interval, intervalSliceMinutes, duration), sort_1.default(intervals));
exports.default = (intervals, intervalSliceMinutes, duration) => !intervalSliceMinutes
    ? flatten_1.default([intervals])
    : Array.isArray(intervals)
        ? partitionMany(intervals, intervalSliceMinutes, duration)
        : partitionOne(intervals, intervalSliceMinutes, duration);
