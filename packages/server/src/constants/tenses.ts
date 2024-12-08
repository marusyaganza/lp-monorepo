import { Tense } from '../generated/graphql';

// Uncomment more tenses as needed
export const TENSES: Record<Tense, string> = {
  pind: 'Presente indicativo',
  pprf: 'Pretérito perfecto simple',
  impf: 'Imperativo',
  pret: 'Pretérito imperfecto',
  futr: 'Futuro indicativo',
  cond: 'Condicional',
  psub: 'Presente subjentivo'
  // gppt: 'Gerundio'
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
