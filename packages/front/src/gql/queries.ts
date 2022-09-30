import { gql } from '@apollo/client';

export const WORDS_QUERY = gql`
  query Words {
    words {
      id
      name
      defs {
        def
      }
      particle
      audioUrl
      transcription
      isOffensive
      level
    }
  }
`;

export const WORD_BY_ID_QUERY = gql`
  query Query($wordId: ID!) {
    word(id: $wordId) {
      id
      name
      defs {
        def
        examples
      }
      particle
      imgUrl
      audioUrl
      additionalInfo
      transcription
      user
      isOffensive
      stems
      level
    }
  }
`;
