import { Format, IntervalOptions } from '..';
interface RequiredIntervalOptions {
    timezone: string;
    format: Required<Format>;
}
export declare const DEFAULT_INTERVAL_OPTIONS: RequiredIntervalOptions;
export declare const setDefaultIntervalOptions: (overrides: IntervalOptions) => RequiredIntervalOptions;
export {};
