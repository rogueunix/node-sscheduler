import * as Interval from '../interval';
declare type normalizeMaybe = (normalize: boolean) => ((x: Interval.Interval[], options: string | Interval.IntervalOptions) => Interval.Interval[] | Interval.ByDay);
export declare const normalizeMaybe: normalizeMaybe;
export {};
