import { Interval, RequiredIntervalOptions } from '../../interval';
import { Nullable } from '../../types';
import { Schedule } from '../Schedule';
import * as dailyTimetable from './DailyTimetable';
import * as weeklyTimetable from './WeeklyTimetable';
declare const _default: (timetable: Nullable<weeklyTimetable.WeeklyTimetable | dailyTimetable.DailyTimetable>, range: Interval, options: RequiredIntervalOptions) => Schedule;
export default _default;
