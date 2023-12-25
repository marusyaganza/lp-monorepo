export default heart;
declare const heart: ({
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
            dt: (string | {
                t: string;
            }[])[][];
        })[] | (string | {
            sn: string;
            dt: string[][];
            sdsense: {
                sd: string;
                dt: (string | {
                    t: string;
                }[])[][];
            };
        })[])[] | ((string | {
            sn: string;
            dt: string[][];
        })[] | (string | {
            sn: string;
            ins: {
                if: string;
                spl: string;
            }[];
            dt: (string | {
                t: string;
            }[])[][];
        })[])[] | ((string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[] | (string | {
            sn: string;
            sls: string[];
            dt: string[][];
        })[])[] | ((string | {
            sense: {
                sn: string;
                dt: string[][];
            };
        })[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[])[])[];
    }[];
    dros: {
        drp: string;
        def: {
            sseq: (string | {
                dt: (string | {
                    t: string;
                }[])[][];
            })[][][];
        }[];
    }[];
    art: {
        artid: string;
        capt: string;
    };
    et: string[][];
    date: string;
    shortdef: string[];
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
        sseq: (((string | {
            sn: string;
            sls: string[];
        })[] | (string | {
            sn: string;
            dt: (string | ({
                t: string;
                aq?: undefined;
            } | {
                t: string;
                aq: {
                    auth: string;
                };
            })[])[][];
        })[] | (string | {
            sn: string;
            dt: (string | {
                t: string;
                aq: {
                    source: string;
                };
            }[])[][];
        })[])[] | (string | {
            sn: string;
            sls: string[];
            dt: string[][];
        })[][])[];
    }[];
    et: string[][];
    date: string;
    shortdef: string[];
    dros?: undefined;
    art?: undefined;
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
            dt: string[][];
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    dros?: undefined;
    art?: undefined;
    et?: undefined;
    date?: undefined;
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
            dt: ((string | string[][])[] | (string | {
                intro: string;
                cats: {
                    cat: string;
                }[];
            })[])[];
        })[][][];
    }[];
    date: string;
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    dros?: undefined;
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
            sn: string;
            dt: string[][];
        })[][][];
    }[];
    date: string;
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    dros?: undefined;
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
    dros?: undefined;
    art?: undefined;
    et?: undefined;
})[];
