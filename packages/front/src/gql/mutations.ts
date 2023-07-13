import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      id
    }
  }
`;

export const SAVE_WORD = gql`
  mutation SaveWord($input: NewWordInput!) {
    saveWord(input: $input) {
      name
      uuid
    }
  }
`;

export const DELETE_WORD = gql`
  mutation DeleteWord($deleteWordId: ID!) {
    deleteWord(id: $deleteWordId)
  }
`;

export const UPDATE_WORD = gql`
  mutation UpdateWord($input: UpdateWordInput!) {
    updateWord(input: $input) {
      name
    }
  }
`;
