const { gql } = require('apollo-server');

const typeDefs = gql`
  enum Role {
    ADMIN
    MEMBER
    GUEST
  }

  enum Level {
    A1
    A2
    B1
    B2
    C1
    C2
  }

  type User {
    email: String!
    firstName: String!
    lastName: String!
    # words: [Word]!
    id: ID
    role: Role
  }

  type WordDefinition {
    def: String!
    examples: [String]
  }

  type WordTag {
    color: String!
    text: String!
  }

  type Word {
    id: ID!
    uuid: ID
    name: String!
    defs: [WordDefinition]!
    particle: String!
    imgUrl: String
    audioUrl: String
    additionalInfo: String
    transcription: String
    user: ID!
    isOffensive: Boolean
    stems: [String]
    tags: [WordTag]
    level: Level
  }

  type AuthUser {
    email: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    role: Role!
    token: String!
    id: ID!
  }

  input DefsInput {
    def: String!
    examples: [String]
  }

  input NewWordInput {
    uuid: ID
    name: String!
    defs: [DefsInput]!
    particle: String!
    imgUrl: String
    audioUrl: String
    additionalInfo: String
    transcription: String
    isOffensive: Boolean
    stems: [String]
    level: Level
  }

  input UpdateWordInput {
    id: ID!
    defs: [DefsInput]
    particle: String
    imgUrl: String
    audioUrl: String
    additionalInfo: String
    transcription: String
    isOffensive: Boolean
    stems: [String]
    level: Level
  }

  input SignUpInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    primaryLanguage: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user: User!
    words: [Word]!
    word(id: ID!): Word!
  }

  type Mutation {
    saveWord(input: NewWordInput!): Word!
    updateWord(input: UpdateWordInput!): Word!
    deleteWord(id: ID!): String!
    signUp(input: SignUpInput): AuthUser!
    login(input: LoginInput): AuthUser!
  }
`;
module.exports = typeDefs;
