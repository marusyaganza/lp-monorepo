export const wordsQuery = `
query WordsPerPage($input: WordsPerPageInput) {
    wordsPerPage(input: $input) {
      hasNext
      wordsCount
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
        isLearned
        level
        shortDef
        tags {
          text
          color
          id
        }
      }
    }
  }
`;

export const wordByIdQuery = `
  query WordById($wordId: ID!) {
    word(id: $wordId) {
      id
      name
      defs {
        def
        examples {
          text
          translation
        }
      }
      particle
      imgUrl
      imgDesc
      audioUrl
      additionalInfo
      transcription
      isOffensive
      isLearned
      stems
      level
      shortDef
      tags {
        text
        color
        id
      }
    }
  }
`;

export const userQuery = `
  {
    user {
      firstName
      lastName
      email
      role
    }
  }
`;

export const searchQuery = `
  query SearchWords($input: WordSearchInput!) {
    searchWord(input: $input) {
      ... on Suggestions {
        suggestions
      }
      ... on DictionaryWord {
        uuid
        transcription
        stems
        particle
        name
        isOffensive
        imgUrl
        defs {
          examples {
            text
            translation
          }
          def
        }
        audioUrl
        additionalInfo
        imgDesc
        shortDef
        language
      }
    }
  }
`;

export const gamesQuery = ` query Games($input: GamesInput) {
    games(input: $input) {
      desc
      name
      id
      type
      wordsToPractice
    }
  }`;

export const gameQuery = `query Game($input: GameDataInput!) {
    game(input: $input) {
      questions {
        wordId
        question
        options
        answer
        additionalInfo {
          audioUrl
          imgUrl
          shortDef
          examples {
            text
            translation
          }
        }
      }
      task
      type
    }
  }`;

export const tagsQuery = `
  query Tags($language: Language!) {
    tags(language: $language) {
      text
      id
      color
      desc
    }
  }
`;

export const wordQueries = {
  wordsQuery,
  wordByIdQuery,
  searchQuery
};

export const userQueries = {
  userQuery
};

export const gameQueries = {
  gameQuery,
  gamesQuery
};

export const tagsQueries = {
  tagsQuery
};
