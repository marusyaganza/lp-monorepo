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

  input NewWordInput {
    user: ID!
    name: String!
    defs: [String]!
    particle: String!
    imgUrl: String
    audioUrl: String
    tags: [String]
    additionalInfo: String
    examples: [String]
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
    signUp(input: SignUpInput): AuthUser!
    login(input: LoginInput): AuthUser!
  }
`;
module.exports = typeDefs;
