import { Interval } from './interval';
import { DateTime } from './sscheduler/DateTime';
export { Interval };
export declare type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export interface TimeInterval {
    from: string;
    to: string;
    reference?: string;
}
export declare type Unavailability = Array<Interval | DateTime>;
export declare type Nullable<T> = T | null | undefined;
export declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
