import * as Interval from '../interval';
export declare const getFreeTimeSlots: (availability: Interval.Interval[], unavailability: Interval.Interval[], targetRange: Interval.Interval, minimumInterval: number, options: Interval.IntervalOptions) => Interval.Interval[];
