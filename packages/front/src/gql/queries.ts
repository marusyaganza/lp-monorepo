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
