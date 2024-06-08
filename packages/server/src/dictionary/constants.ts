import { Tense } from 'generated/graphql';

export type TagType = {
  tag: string;
  replacement: string;
};

export type ComplexTagType = {
  opening: string;
  closing: string;
};

export const TAGS: TagType[] = [
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

export const COMPLEX_TAGS: ComplexTagType[] = [
  { opening: '{sx', closing: '}' },
  { opening: '{d_link', closing: '}' },
  { opening: '{a_link', closing: '}' },
  { opening: '{i_link', closing: '}' },
  { opening: '{et_link', closing: '}' },
  { opening: '{mat', closing: '}' },
  { opening: '{dxt', closing: '}' }
];

export const COMPLEX_TAGS_TO_REMOVE: ComplexTagType[] = [
  { opening: '{ds|', closing: '}' }
];

export const HW_TAGS: TagType[] = [
  { tag: '{bit}', replacement: '' },
  { tag: '{/bit}', replacement: '' }
];

// Uncomment more tenses as needed
export const TENSES: Record<Tense, string> = {
  pind: 'Presente indicativo',
  pprf: 'Pretérito perfecto simple',
  impf: 'Imperativo',
  pret: 'Pretérito imperfecto'
  //   futr: 'Futuro indicativo',
  //   cond: 'Condicional',
  //   psub: 'Presente subjentivo',
  //   pisb1: 'Pretérito imperfecto',
  //   pisb2: 'Pretérito imperfecto 2',
  //   fsub: 'Futuro',
  //   ppci: 'Pretérito perfecto compuesto',
  //   ppsi: 'Pretérito pluscuamperfecto',
  //   pant: 'Pretérito anterior',
  //   fpin: 'Futuro perfecto',
  //   cpef: 'Condicional perfecto',
  //   ppfs: 'Pretérito perfecto',
  //   ppss1: 'Pretérito pluscuamperfecto',
  //   ppss2: 'Pretérito pluscuamperfecto 2',
  //   fpsb: 'Futuro perfecto',
};
