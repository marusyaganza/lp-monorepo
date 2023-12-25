export default hola;
declare const hola: {
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
            dt: string[][];
        })[][][];
    }[];
    shortdef: string[];
}[];
