import { gql } from '@apollo/client';

export const WORDS_QUERY = gql`
  query WordsQuery {
    words {
      name
      defs
      id
      particle
      examples
      additionalInfo
      imgUrl
      audioUrl
      transcription
      tags
    }
  }
`;

export const IRREGULAR_SPANISH_VERBS = gql`
  query IrregularverbsQuery {
    irregularVerbs {
      conjugation {
        yo
        tu
        el
        nosotros
        vosotros
        ellos
      }
      isIrregularVerb
      particle
      defs
      user
      name
      lang
      id
    }
  }
`;
