export const wordsQuery = `
query Words($input: WordsInput) {
  words(input: $input) {
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
`;

export const wordByIdQuery = `
  query Query($wordId: ID!) {
    word(id: $wordId) {
      id
      name
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

export const userQuery = `
  {
    user {
      firstName
      lastName
      email
      id
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
      }
    }
  }
`;

export const gamesQuery = `query Games {
  games {
    desc
    name
    id
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
