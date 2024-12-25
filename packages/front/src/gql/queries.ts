import { gql } from '@apollo/client';

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

export const SEARCH_WORDS_QUERY = gql`
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
        conjugation {
          cjid
          cjfs
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
export const USER_QUERY = gql`
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

export const GAMES_QUERY = gql`
  query Games($language: Language) {
    games(language: $language) {
      desc
      name
      id
      type
    }
  }
`;

export const GAME_QUERY = gql`
  query Game($input: GameDataInput!) {
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
      tense
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

export const WORDS_PER_PAGE_QUERY = gql`
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

export const VERBS_QUERY = gql`
  query Verbs {
    verbs {
      id
      name
    }
  }
`;
