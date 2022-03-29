"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatten_1 = require("../common/flatten");
const insertMaybe_1 = require("../common/insertMaybe");
const hasIntersection_1 = require("./hasIntersection");
const isBetween_1 = require("./isBetween");
const isGreaterOrEqual_1 = require("./isGreaterOrEqual");
const sort_1 = require("./sort");
const substractManyFromMany = (a, b) => {
    if (!a || !b)
        return a || [];
    const [sortedA, sortedB] = [sort_1.default(a), sort_1.default(b)];
    const result = [];
    let i = 0;
    let j = 0;
    for (const [index, next] of sortedA.entries()) {
        while (i < sortedB.length && sortedB[i].to.isBefore(next.from))
            i++;
        while (j < sortedB.length && sortedB[j].from.isBefore(next.to))
            j++;
        if (i >= sortedB.length)
            return result.concat(sortedA.slice(index));
        result.push(...substractManyFromOne(next, sortedB.slice(i, j + 1)));
    }
    return result;
};
const substractManyFromOne = (a, b) => b.reduce((availabilities, unavailability) => [
    ...availabilities.slice(0, -1),
    ...substractOneFromOne(availabilities.pop(), unavailability)
], [a]);
const substractOneFromOne = (a, b) => (() => {
    const bBetweenA = isBetween_1.default(a, b, true);
    const negativeResult = bBetweenA && isGreaterOrEqual_1.default(b, a);
    if (!a || negativeResult) {
        return [];
    }
    if (!b || !hasIntersection_1.default(a, b)) {
        return [a];
    }
    if (bBetweenA) {
        return [
            Object.assign({ from: a.from }, insertMaybe_1.default({ reference: a.reference }), { to: b.from }),
            Object.assign({ from: b.to }, insertMaybe_1.default({ reference: a.reference }), { to: a.to })
        ];
    }
    return [
        Object.assign({ from: a.from.isBefore(b.from) ? a.from : b.to }, insertMaybe_1.default({ reference: a.reference }), { to: a.to.isAfter(b.to)
                ? a.to
                : b.from })
    ];
})().filter(interval => interval.from.isBefore(interval.to));
exports.default = (a, b) => substractManyFromMany(a && flatten_1.default([a]), b && flatten_1.default([b]));
