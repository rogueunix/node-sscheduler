import { SSchedulerParams, TimeAvailability as TimeAvailabilities } from '.';
import * as Interval from '../interval';
declare const _default: ({ from, to, schedule: { availability, unavailability, allocated, custom_schedule, weekdays, ...dailyTimetable }, interval, duration, showUnavailable, normalize, parseTimezone, displayTimezone, dateFormat }: SSchedulerParams) => Interval.ByDay | Interval.Interval[] | TimeAvailabilities;
export default _default;
