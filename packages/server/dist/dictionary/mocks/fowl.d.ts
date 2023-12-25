export default fowl;
declare const fowl: ({
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
            sn: string;
            dt: string[][];
            sdsense: {
                sd: string;
                dt: string[][];
            };
        })[] | (string | {
            sn: string;
            dt: string[][];
        })[])[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[][])[];
    }[];
    et: string[][];
    date: string;
    shortdef: string[];
    art?: undefined;
    lbs?: undefined;
    uros?: undefined;
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
            dt: string[][];
        })[][][];
    }[];
    et: string[][];
    date: string;
    shortdef: string[];
    art?: undefined;
    lbs?: undefined;
    uros?: undefined;
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
        sseq: (string | {
            dt: string[][];
            sdsense: {
                sd: string;
                dt: string[][];
            };
        })[][][];
    }[];
    art: {
        artid: string;
        capt: string;
    };
    date: string;
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    et?: undefined;
    lbs?: undefined;
    uros?: undefined;
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
        sseq: (string | {
            dt: string[][];
            sdsense: {
                sd: string;
                dt: string[][];
            };
        })[][][];
    }[];
    date: string;
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    et?: undefined;
    art?: undefined;
    lbs?: undefined;
    uros?: undefined;
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
    lbs: string[];
    def: {
        sseq: (((string | {
            sn: string;
            dt: (string | (string | {
                t: string;
            }[])[][][])[][];
        })[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[])[] | ((string | {
            sense: {
                sn: string;
                dt: string[][];
            };
        })[] | (string | {
            sn: string;
            ins: ({
                if: string;
                il?: undefined;
                spl?: undefined;
            } | {
                il: string;
                if: string;
                spl: string;
            })[];
            dt: string[][];
            sdsense: {
                sd: string;
                dt: string[][];
            };
        })[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[])[])[];
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
    dros: ({
        drp: string;
        def: {
            sseq: (string | {
                dt: (string | {
                    t: string;
                }[])[][];
            })[][][];
        }[];
    } | {
        drp: string;
        def: {
            sseq: (string | {
                dt: (string | (string | {
                    t: string;
                }[])[][][])[][];
            })[][][];
        }[];
    })[];
    art: {
        artid: string;
        capt: string;
    };
    et: string[][];
    date: string;
    shortdef: string[];
})[];
