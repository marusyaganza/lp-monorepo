const wordsQuery = `
  {
    words {
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
