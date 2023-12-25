"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HW_TAGS = exports.COMPLEX_TAGS_TO_REMOVE = exports.COMPLEX_TAGS = exports.TAGS = void 0;
exports.TAGS = [
    { tag: '{b}', replacement: '<b>' },
    { tag: '{/b}', replacement: '</b>' },
    { tag: '{ldquo}', replacement: '\u201C' },
    { tag: '{rdquo}', replacement: '\u201D' },
    { tag: '{it}', replacement: '<i>' },
    { tag: '{/it}', replacement: '</i>' },
    { tag: '{wi}', replacement: '<i>' },
    { tag: '{/wi}', replacement: '</i>' },
    { tag: '{gloss}=', replacement: '<i>' },
    { tag: '{/gloss}', replacement: '</i>' },
    { tag: '{sc}', replacement: '<i>' },
    { tag: '{/sc}', replacement: '</i>' },
    { tag: '{parahw}', replacement: '</i>' },
    { tag: '{/parahw}', replacement: '</i>' },
    { tag: '{phrase}', replacement: '</i>' },
    { tag: '{/phrase}', replacement: '</i>' },
    { tag: '{qword}', replacement: '</i>' },
    { tag: '{/qword}', replacement: '</i>' },
    { tag: '{itsc}', replacement: '<i>' },
    { tag: '{/itsc}', replacement: '</i>' },
    { tag: '{inf}', replacement: '' },
    { tag: '{/inf}', replacement: '' },
    { tag: '{sup}', replacement: '' },
    { tag: '{/sup}', replacement: '' },
    { tag: '{bc}', replacement: '' },
    { tag: '{dx}', replacement: '' },
    { tag: '{/dx}', replacement: '' },
    { tag: '{dx_def}', replacement: '' },
    { tag: '{/dx_def}', replacement: '' },
    { tag: '{dx_ety}', replacement: '' },
    { tag: '{/dx_ety}', replacement: '' },
    { tag: '{ma}', replacement: '' },
    { tag: '{/ma}', replacement: '' },
    { tag: '{rom}', replacement: '' },
    { tag: '{/rom}', replacement: '' }
];
exports.COMPLEX_TAGS = [
    { opening: '{sx', closing: '}' },
    { opening: '{d_link', closing: '}' },
    { opening: '{a_link', closing: '}' },
    { opening: '{i_link', closing: '}' },
    { opening: '{et_link', closing: '}' },
    { opening: '{mat', closing: '}' },
    { opening: '{dxt', closing: '}' }
];
exports.COMPLEX_TAGS_TO_REMOVE = [
    { opening: '{ds|', closing: '}' }
];
exports.HW_TAGS = [
    { tag: '{bit}', replacement: '' },
    { tag: '{/bit}', replacement: '' }
];
//# sourceMappingURL=constants.js.map