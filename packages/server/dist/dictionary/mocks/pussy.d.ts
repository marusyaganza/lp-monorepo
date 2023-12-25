export const pussy: ({
    meta: {
        id: string;
        uuid: string;
        src: string;
        section: string;
        stems: string[];
        'app-shortdef': {
            hw: string;
            fl: string;
            def: string[];
        };
        offensive: boolean;
        target?: undefined;
    };
    hom: number;
    hwi: {
        hw: string;
        prs: {
            ipa: string;
            sound: {
                audio: string;
            };
        }[];
    };
    fl: string;
    ins: {
        il: string;
        if: string;
    }[];
    gram: string;
    def: {
        sseq: (string | {
            sls: string[];
            dt: (string | string[][][])[][];
        })[][][];
    }[];
    dxnls: string[];
    shortdef: string[];
} | {
    meta: {
        id: string;
        uuid: string;
        src: string;
        section: string;
        stems: string[];
        'app-shortdef': {
            hw: string;
            fl: string;
            def: string[];
        };
        offensive: boolean;
        target?: undefined;
    };
    hom: number;
    hwi: {
        hw: string;
        prs: {
            ipa: string;
            sound: {
                audio: string;
            };
        }[];
    };
    fl: string;
    ins: {
        il: string;
        if: string;
    }[];
    gram: string;
    def: {
        sseq: (string | {
            sls: string[];
            dt: string[][];
            sdsense: {
                sd: string;
                dt: (string | string[][])[][];
            };
        })[][][];
    }[];
    dxnls: string[];
    shortdef: string[];
} | {
    meta: {
        id: string;
        uuid: string;
        src: string;
        section: string;
        stems: string[];
        'app-shortdef': {
            hw: string;
            fl: string;
            def: string[];
        };
        offensive: boolean;
        target?: undefined;
    };
    hom: number;
    hwi: {
        hw: string;
        prs: {
            ipa: string;
            sound: {
                audio: string;
            };
        }[];
    };
    fl: string;
    ins: {
        il: string;
        if: string;
    }[];
    gram: string;
    def: {
        sseq: (string | {
            sls: string[];
            dt: (string | {
                t: string;
            }[])[][];
        })[][][];
    }[];
    dxnls: string[];
    shortdef: string[];
} | {
    meta: {
        id: string;
        uuid: string;
        src: string;
        section: string;
        target: {
            tuuid: string;
            tsrc: string;
        };
        stems: string[];
        'app-shortdef': {
            hw: string;
            fl: string;
            def: string[];
        };
        offensive: boolean;
    };
    hwi: {
        hw: string;
        prs?: undefined;
    };
    fl: string;
    ins: {
        il: string;
        ifc: string;
        if: string;
    }[];
    gram: string;
    def: {
        sseq: (string | {
            dt: string[][];
            sdsense: {
                sd: string;
                dt: string[][];
            };
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    dxnls?: undefined;
})[];
export default pussy;
