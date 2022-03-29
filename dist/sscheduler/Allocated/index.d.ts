export interface Allocation {
    from: string;
    duration: number;
}
export interface Allocated {
    allocated: Allocation[];
}
export { default as toInterval } from './toInterval';
