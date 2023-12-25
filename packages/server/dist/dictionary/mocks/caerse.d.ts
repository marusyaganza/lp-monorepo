export default caerse;
declare const caerse: {
    meta: {
        id: string;
        uuid: string;
        lang: string;
        sort: string;
        src: string;
        section: string;
        stems: string[];
        offensive: boolean;
    };
    hwi: {
        hw: string;
        prs: {
            sound: {
                audio: string;
            };
        }[];
    };
    fl: string;
    def: {
        sseq: ((string | {
            sn: string;
            dt: (string | {
                t: string;
                tr: string;
            }[])[][];
        })[][] | (string | {
            sn: string;
            vrs: {
                va: string;
                vac: string;
            }[];
            dt: (string | {
                t: string;
                tr: string;
            }[])[][];
        })[][] | (string | {
            sn: string;
            vrs: {
                va: string;
            }[];
            dt: string[][];
        })[][] | (string | {
            sn: string;
            vrs: {
                va: string;
            }[];
            sls: string[];
            dt: (string | {
                t: string;
                tr: string;
            }[])[][];
        })[][])[];
    }[];
    dros: {
        drp: string;
        fl: string;
        def: {
            sseq: (string | {
                dt: (string | {
                    t: string;
                    tr: string;
                }[])[][];
            })[][][];
        }[];
    }[];
    suppl: {
        cjts: {
            cjid: string;
            cjfs: string[];
        }[];
    };
    shortdef: string[];
}[];
