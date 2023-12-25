export default wheel;
declare const wheel: ({
    meta: {
        id: string;
        uuid: string;
        sort: string;
        src: string;
        section: string;
        stems: string[];
        offensive: boolean;
    };
    hom: number;
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
    ins: {
        il: string;
        if: string;
    }[];
    def: {
        sseq: (((string | {
            sense: {
                sn: string;
                dt: string[][];
            };
        })[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
                aq: {
                    auth: string;
                };
            }[])[][];
        })[])[] | ((string | {
            sn: string;
            dt: string[][];
        })[] | (string | {
            sn: string;
            dt: string[][];
            sdsense: {
                sd: string;
                dt: string[][];
            };
        })[])[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[][] | (string | {
            sn: string;
            ins: {
                if: string;
                spl: string;
            }[];
            sls: string[];
            dt: string[][];
            sdsense: {
                sd: string;
                dt: (string | {
                    t: string;
                    aq: {
                        auth: string;
                    };
                }[])[][];
            };
        })[][] | (string | {
            sn: string;
            ins: {
                if: string;
                spl: string;
            }[];
            sls: string[];
            dt: string[][];
        })[][])[];
    }[];
    uros: {
        ure: string;
        prs: {
            mw: string;
            sound: {
                audio: string;
                ref: string;
                stat: string;
            };
        }[];
        fl: string;
    }[];
    art: {
        artid: string;
        capt: string;
    };
    et: string[][];
    date: string;
    shortdef: string[];
    dros?: undefined;
} | {
    meta: {
        id: string;
        uuid: string;
        sort: string;
        src: string;
        section: string;
        stems: string[];
        offensive: boolean;
    };
    hom: number;
    hwi: {
        hw: string;
        prs?: undefined;
    };
    fl: string;
    ins: {
        if: string;
    }[];
    def: {
        vd: string;
        sseq: (string | {
            sn: string;
            dt: (string | ({
                t: string;
                aq: {
                    auth: string;
                };
            } | {
                t: string;
                aq?: undefined;
            })[])[][];
        })[][][];
    }[];
    dros: {
        drp: string;
        def: {
            sseq: (string | {
                dt: string[][];
            })[][][];
        }[];
    }[];
    date: string;
    shortdef: string[];
    uros?: undefined;
    art?: undefined;
    et?: undefined;
} | {
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
        prs?: undefined;
    };
    fl: string;
    def: {
        sseq: (string | {
            dt: string[][];
        })[][][];
    }[];
    date: string;
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    uros?: undefined;
    art?: undefined;
    et?: undefined;
    dros?: undefined;
} | {
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
        sseq: (string | {
            dt: (string | {
                t: string;
            }[])[][];
        })[][][];
    }[];
    date: string;
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    uros?: undefined;
    art?: undefined;
    et?: undefined;
    dros?: undefined;
} | {
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
        prs?: undefined;
    };
    fl: string;
    def: {
        sls: string[];
        sseq: (string | {
            dt: string[][];
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    uros?: undefined;
    art?: undefined;
    et?: undefined;
    date?: undefined;
    dros?: undefined;
})[];
