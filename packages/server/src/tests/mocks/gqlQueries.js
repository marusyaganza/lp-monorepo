const wordsQuery = `
 query Words($input: WordsInput) {
      words(input: $input) {
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

const wordByIdQuery = `
  query Query($wordId: ID!) {
    word(id: $wordId) {
      name
      shortDef
      defs {
        def
        examples {
          text
        }
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

const userQuery = `
  {
    user {
      firstName
      lastName
      email
      role
    }
  }
`;

export const queries = {
  wordByIdQuery,
  wordsQuery,
  userQuery
};
