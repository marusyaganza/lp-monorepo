export default voluminous;
declare const voluminous: {
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
    fl: string;
    def: {
        sseq: ((string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
            sdsense: {
                sd: string;
                dt: (string | {
                    t: string;
                }[])[][];
            };
        })[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[])[][];
    }[];
    uros: {
        ure: string;
        fl: string;
    }[];
    et: string[][];
    date: string;
    shortdef: string[];
}[];
