const signUpMutation = `
  mutation {
    signUp(
      input: {
        firstName: "User"
        lastName: "Test"
        email: "test@test.com"
        password: "password"
      }
    ) {
      email
      firstName
      lastName
      token
    }
  }
`;

const loginMutation = `
  mutation($input: LoginInput!) {
    login(input: $input) {
      email
      firstName
      lastName
      token
    }
  }
`;

const saveWordMutation = `mutation($input: NewWordInput!) {
  saveWord(input: $input) {
    uuid
    user
    transcription
    tags {
      text
      color
    }
    stems
    particle
    name
    level
    isOffensive
    imgUrl
    id
    defs {
      examples
      def
    }
    audioUrl
    additionalInfo
  }
}`;

const updateWordMutation = `
mutation($input: UpdateWordInput!) {
  updateWord(input: $input) {
    additionalInfo
    audioUrl
    defs {
      examples
      def
    }
    imgUrl
    isOffensive
    level
    name
    particle
    stems
    tags {
      text
      color
    }
    transcription
    user
    uuid
  }
}
`;

const deleteWordMutation = `mutation($deleteWordId: ID!) {
  deleteWord(id: $deleteWordId)
}`;

export const mutations = {
  signUpMutation,
  loginMutation,
  saveWordMutation,
  updateWordMutation,
  deleteWordMutation
};
