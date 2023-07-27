import { Word, Language } from '../generated/graphql';

export const madeUpWord: Word = {
  audioUrl: 'mock_audio_endpoint/en/us/mp3/p/pussy001.mp3',
  defs: [
    {
      def: 'flibberfazzle means to engage in a playful and creative activity that sparks joy and imagination. It involves letting go of inhibitions and embracing a carefree spirit to explore new ideas and possibilities'
    }
  ],
  isOffensive: true,
  shortDef: [
    'to engage in a playful and creative activity that sparks joy and imagination. It involves letting go of inhibitions and embracing a carefree spirit to explore new ideas and possibilities'
  ],
  language: Language.English,
  imgDesc: 'image Descr',
  imgUrl: 'mock_img_endpoint/imageId.gif',
  name: 'flibberfazzle',
  particle: 'verb',
  stems: ['flibberfazzle'],
  transcription: 'flibberfazzle',
  uuid: 'mockUuid1',
  createdAt: '1690394102980',
  user: 'mockUser',
  id: 'mockId'
};
