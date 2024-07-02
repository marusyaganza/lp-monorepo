const signUpMutation = `
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    email
    firstName
    lastName
    token
    id
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
      examples {
        text
      }
      def
    }
    audioUrl
    shortDef
    additionalInfo
  }
}`;

const updateWordMutation = `
mutation($input: UpdateWordInput!) {
  updateWord(input: $input) {
    additionalInfo
    audioUrl
    defs {
      examples {
        text
      }
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
    shortDef
    user
    uuid
  }
}
`;

const deleteWordMutation = `mutation($deleteWordId: ID!) {
  deleteWord(id: $deleteWordId)
}`;

const saveGameResultMutation = `
mutation SaveGameResult($input: [UpdateStatisticsInput!]) {
  saveGameResult(input: $input)
}
`;

export const updateTagMutation = `
  mutation UpdateTag($input: UpdateWordTagInput!) {
    updateTag(input: $input)
  }
`;

export const createTagMutation = `
  mutation CreateTag($input: WordTagInput!) {
    createTag(input: $input)
  }
`;

export const deleteTagMutation = `
  mutation DeleteTag($deleteTagId: ID!) {
    deleteTag(id: $deleteTagId) {
      text
      desc
      color
      id
    }
  }
`;

export const mutations = {
  signUpMutation,
  loginMutation,
  saveWordMutation,
  updateWordMutation,
  deleteWordMutation,
  saveGameResultMutation,
  updateTagMutation,
  createTagMutation,
  deleteTagMutation
};
