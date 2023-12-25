export default rubber;
declare const rubber: ({
    meta: {
        id: string;
        uuid: string;
        src: string;
        section: string;
        highlight: string;
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
        altprs?: undefined;
    };
    fl: string;
    ins: {
        il: string;
        ifc: string;
        if: string;
    }[];
    def: {
        sseq: ((string | {
            sn: string;
            sgram: string;
            dt: ((string | {
                t: string;
            }[])[] | (string | (string | {
                t: string;
            }[])[][][])[])[];
        })[][] | (string | {
            sn: string;
            sgram: string;
            sls: string[];
            dt: string[][];
        })[][] | (string | {
            sn: string;
            bnote: string;
            sgram: string;
            sls: string[];
            dt: string[][];
        })[][])[];
    }[];
    dros: {
        drp: string;
        def: {
            sseq: (string | {
                sls: string[];
                dt: (string | {
                    t: string;
                }[])[][];
            })[][][];
        }[];
    }[];
    dxnls: string[];
    shortdef: string[];
    gram?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
        target?: undefined;
    };
    hom: number;
    hwi: {
        hw: string;
        altprs: {
            ipa: string;
        }[];
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
        sseq: ((string | {
            sn: string;
            dt: (string | {
                t: string;
            }[])[][];
        })[][] | (string | {
            sn: string;
            sls: string[];
            dt: (string | (string | {
                t: string;
            }[])[][][])[][];
        })[][])[];
    }[];
    dxnls: string[];
    shortdef: string[];
    dros?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
    };
    hwi: {
        hw: string;
        prs: {
            ipa: string;
            sound: {
                audio: string;
            };
        }[];
        altprs?: undefined;
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
            dt: (string | {
                intro: string;
                cats: ({
                    cat: string;
                    psl?: undefined;
                } | {
                    psl: string;
                    cat: string;
                })[];
            })[][];
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    dros?: undefined;
    dxnls?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
    };
    hwi: {
        hw: string;
        prs: ({
            ipa: string;
            pun: string;
            sound: {
                audio: string;
            };
            l?: undefined;
        } | {
            l: string;
            ipa: string;
            pun?: undefined;
            sound?: undefined;
        })[];
        altprs?: undefined;
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
            sls: string[];
            dt: (string | {
                intro: string;
                cats: {
                    cat: string;
                }[];
            })[][];
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    dros?: undefined;
    dxnls?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
    };
    hwi: {
        hw: string;
        prs?: undefined;
        altprs?: undefined;
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
            dt: (string | {
                intro: string;
                cats: ({
                    cat: string;
                    psl?: undefined;
                } | {
                    psl: string;
                    cat: string;
                })[];
            })[][];
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    dros?: undefined;
    dxnls?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
        target?: undefined;
    };
    hwi: {
        hw: string;
        prs?: undefined;
        altprs?: undefined;
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
            sls: string[];
            dt: (string | {
                intro: string;
                cats: {
                    cat: string;
                }[];
            })[][];
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    dros?: undefined;
    dxnls?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
        target?: undefined;
    };
    hwi: {
        hw: string;
        prs?: undefined;
        altprs?: undefined;
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
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    dros?: undefined;
    dxnls?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
    };
    hwi: {
        hw: string;
        prs?: undefined;
        altprs?: undefined;
    };
    fl: string;
    gram: string;
    def: {
        sseq: (string | {
            dt: string[][];
        })[][][];
    }[];
    shortdef: string[];
    hom?: undefined;
    ins?: undefined;
    dros?: undefined;
    dxnls?: undefined;
    artl?: undefined;
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
        highlight?: undefined;
    };
    hwi: {
        hw: string;
        prs?: undefined;
        altprs?: undefined;
    };
    fl: string;
    ins: {
        il: string;
        ifc: string;
        if: string;
    }[];
    gram: string;
    def: {
        sseq: ((string | {
            sn: string;
            dt: string[][];
        })[][] | (string | {
            sn: string;
            sls: string[];
            dt: (string | {
                t: string;
            }[])[][];
        })[][])[];
    }[];
    artl: {
        artid: string;
        capt: string;
        dim: string;
    }[];
    shortdef: string[];
    hom?: undefined;
    dros?: undefined;
    dxnls?: undefined;
})[];
