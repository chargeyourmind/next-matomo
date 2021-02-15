declare type InitSettings = {
    url: string;
    siteId: string;
    jsTrackerFile?: string;
    phpTrackerFile?: string;
    excludeUrlsPatterns?: RegExp[];
};
export declare function init({ url, siteId, jsTrackerFile, phpTrackerFile, excludeUrlsPatterns, }: InitSettings): void;
export declare function push(args: (string | string[] | number | number[])[]): void;
export default init;
//# sourceMappingURL=index.d.ts.map