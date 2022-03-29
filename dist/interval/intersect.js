"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatten_1 = require("../common/flatten");
const insertMaybe_1 = require("../common/insertMaybe");
const toMoment_1 = require("./toMoment");
const toSortedUnixInterval = (a) => a
    .map(({ from, to, reference }) => (Object.assign({ from: +from }, insertMaybe_1.default({ reference }), { to: +to })))
    .sort((a, b) => a.from - b.from);
const intersectMany = (a, b) => {
    const [sortedA, sortedB] = [toSortedUnixInterval(a), toSortedUnixInterval(b)];
    const result = [];
    let i = 0;
    let j = 0;
    while (i < sortedA.length && j < sortedB.length) {
        const intersection = intersectUnixInterval(sortedA[i], sortedB[j]);
        if (intersection)
            result.push(intersection);
        sortedA[i].to <= sortedB[j].from ? i++ : j++;
    }
    return result.map(interval => toMoment_1.default(interval));
};
const intersectUnixInterval = (a, b) => {
    const res = Object.assign({ from: Math.max(a.from, b.from) }, insertMaybe_1.default({
        reference: a.reference !== undefined ? a.reference : b.reference
    }), { to: Math.min(a.to, b.to) });
    return res.from < res.to ? res : null;
};
exports.default = (a, b) => intersectMany(flatten_1.default([a]), flatten_1.default([b]));
