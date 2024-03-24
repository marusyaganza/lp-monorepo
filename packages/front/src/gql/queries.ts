import { gql } from '@apollo/client';

export const WORDS_QUERY = gql`
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

export const WORD_BY_ID_QUERY = gql`
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
      alternativeSpelling
      tags {
        text
        color
        id
      }
    }
  }
`;

export const SEARCH_WORDS = gql`
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
export const USER = gql`
  query User {
    user {
      createdAt
      email
      firstName
      lastName
      primaryLanguage
      role
    }
  }
`;

export const GAMES = gql`
  query Games {
    games {
      desc
      imgUrl
      name
      id
      type
    }
  }
`;

export const GAME = gql`
  query Game($input: GameDataInput!) {
    game(input: $input) {
      questions {
        wordId
        question
        options
        answer
        alternativeSpelling
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
  }
`;

export const TAGS_QUERY = gql`
  query Tags($language: Language!) {
    tags(language: $language) {
      text
      id
      color
      desc
    }
  }
`;
