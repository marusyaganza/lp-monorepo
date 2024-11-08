import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      id
    }
  }
`;

export const SAVE_WORD_MUTATION = gql`
  mutation SaveWord($input: NewWordInput!) {
    saveWord(input: $input) {
      name
      uuid
    }
  }
`;

export const DELETE_WORD_MUTATION = gql`
  mutation DeleteWord($deleteWordId: ID!) {
    deleteWord(id: $deleteWordId)
  }
`;

export const UPDATE_WORD_MUTATION = gql`
  mutation UpdateWord($input: UpdateWordInput!) {
    updateWord(input: $input) {
      name
    }
  }
`;

export const SAVE_GAME_RESULT_MUTATION = gql`
  mutation SaveGameResult($input: [UpdateStatisticsInput!]!) {
    saveGameResult(input: $input)
  }
`;

export const UPDATE_TAG_MUTATION = gql`
  mutation UpdateTag($input: UpdateWordTagInput!) {
    updateTag(input: $input)
  }
`;

export const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($input: WordTagInput!) {
    createTag(input: $input)
  }
`;

export const DELETE_TAG_MUTATION = gql`
  mutation DeleteTag($deleteTagId: ID!) {
    deleteTag(id: $deleteTagId) {
      text
      id
    }
  }
`;
