export default murther;
declare const murther: {
    meta: {
        id: string;
        uuid: string;
        sort: string;
        src: string;
        section: string;
        stems: string[];
        offensive: boolean;
    };
    hwi: {
        hw: string;
        prs: {
            mw: string;
            sound: {
                audio: string;
                ref: string;
                stat: string;
            };
        }[];
    };
    cxs: {
        cxl: string;
        cxtis: {
            cxt: string;
        }[];
    }[];
    shortdef: never[];
}[];
