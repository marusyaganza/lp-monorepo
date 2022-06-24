export type LinkType = {
    url: string;
    text: string;
  };

  export type ConjugationType = {
    yo: string;
    tu: string;
    el: string;
    nosotros: string;
    vosotros: string;
    ellos: string;
};

  export type WordType = {
    id: string,
    name: string,
    defs: string[],
    particle: string,
    user:string
    uuid?: string
    transcription?: string,
    imgUrl?: string,
    audioUrl?: string,
    tags?: string[],
    additionalInfo?: string,
    examples?: string[],
    isIrregularVerb: boolean,
    conjugation: ConjugationType
  }