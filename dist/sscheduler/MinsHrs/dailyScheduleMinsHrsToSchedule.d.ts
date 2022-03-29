import { DailyScheduleMinsHrs } from '.';
import { Interval, MomentInterval } from '../../interval';
import { Schedule } from '../Schedule';
declare const _default: (dailyScheduleMinsHrs: DailyScheduleMinsHrs, getFormattedInterval: (interval?: MomentInterval | undefined) => Interval[], momentRange: MomentInterval, daysInRange: number, timezone: string) => Schedule;
export default _default;
