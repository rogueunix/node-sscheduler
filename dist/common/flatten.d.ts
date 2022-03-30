declare type flatten = <T extends any[]>(xs: T) => T extends Array<infer U> ? (U extends Array<infer V> ? V[] : U[]) : never;
declare const _default: flatten;
export default _default;
