import { Interval, TimeInterval, Unavailability } from '../../types';
export interface Schedule {
    availability: Interval[];
    unavailability: Unavailability;
}
export interface CustomSchedule {
    custom_schedule: Array<{
        date: string;
    } & TimeInterval>;
}
export { default as getEmptySchedule } from './getEmptySchedule';
