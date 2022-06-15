import { gql } from '@apollo/client';

export const WORDS_QUERY = gql`
  query WordsQuery {
    words {
      defs
      id
      particle
    }
  }
`;
