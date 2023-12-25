export default idioma;
declare const idioma: {
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
        sseq: (string | {
            dt: (string | {
                t: string;
                tr: string;
            }[])[][];
        })[][][];
    }[];
    shortdef: string[];
}[];
