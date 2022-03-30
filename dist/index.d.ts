import { SScheduleIntersectionParams, SSchedulerParams } from './sscheduler';
import getAvailabilities from './sscheduler/getAvailabilities';
export declare class Scheduler {
    getAvailability(params: SSchedulerParams): import("./interval/types").ByDay | import("./interval/types").Interval[] | import("./sscheduler/index").TimeAvailability;
    getIntersection(params: SScheduleIntersectionParams): import("./interval/types").ByDay | import("./interval/types").Interval[];
}
export { getAvailabilities };
