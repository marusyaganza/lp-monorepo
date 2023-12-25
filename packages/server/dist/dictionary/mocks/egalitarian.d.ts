export default words;
declare const words: {
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
            sls: string[];
        };
        offensive: boolean;
    };
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
    gram: string;
    def: {
        sseq: (string | {
            sls: string[];
            dt: (string | {
                t: string;
            }[])[][];
        })[][][];
    }[];
    uros: ({
        ure: string;
        fl: string;
        ins: {
            il: string;
            ifc: string;
            if: string;
        }[];
        gram: string;
        utxt: (string | {
            t: string;
        }[])[][];
        prs?: undefined;
    } | {
        ure: string;
        prs: {
            ipa: string;
            sound: {
                audio: string;
            };
        }[];
        fl: string;
        gram: string;
        ins?: undefined;
        utxt?: undefined;
    })[];
    shortdef: string[];
}[];
