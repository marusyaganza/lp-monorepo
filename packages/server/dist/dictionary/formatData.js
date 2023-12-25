"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatData = exports.formatDictionaryWord = void 0;
const graphql_1 = require("../generated/graphql");
const helpers_1 = require("./helpers");
function formatDictionaryWord(word) {
    const { def, meta, hwi, art, shortdef, cxs } = word;
    const { uuid, id, stems, offensive, lang } = meta;
    const metaData = {
        uuid,
        stems,
        name: (0, helpers_1.filterString)(id),
        isOffensive: offensive
    };
    const defs = (0, helpers_1.getDefs)(def, cxs);
    const pronunciation = hwi?.prs?.[0];
    const transcription = pronunciation?.mw || (0, helpers_1.formatHw)(hwi?.hw);
    const audio = pronunciation?.sound?.audio;
    const audioUrl = (0, helpers_1.getAudioUrl)(audio, lang);
    const language = lang == 'es' ? graphql_1.Language.Spanish : graphql_1.Language.English;
    const imgUrl = (0, helpers_1.getImgUrl)(art?.artid);
    const imgDesc = (0, helpers_1.formatDictionaryEntity)(art?.capt);
    const particle = word?.fl ?? 'noun';
    const shortDef = shortdef?.length ? shortdef : defs.map(def => def.def);
    if (!defs?.length) {
        return;
    }
    return {
        ...metaData,
        particle,
        defs,
        transcription,
        imgUrl,
        imgDesc,
        audioUrl,
        shortDef,
        language
    };
}
exports.formatDictionaryWord = formatDictionaryWord;
function formatData(data) {
    if (data.some(el => typeof el === 'string')) {
        return [{ suggestions: data }];
    }
    // @ts-ignore
    return data.map(entry => formatDictionaryWord(entry)).filter(Boolean);
}
exports.formatData = formatData;
//# sourceMappingURL=formatData.js.map