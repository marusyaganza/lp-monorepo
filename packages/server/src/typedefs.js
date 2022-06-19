const {gql}  = require('apollo-server');

const typeDefs = gql`

enum Role {
    ADMIN,
    MEMBER,
    GUEST
}

type User {
    email: String!
    name: String!
    # words: [Word]!
    id: ID
    role: Role
}

type Word {
    id: ID!,
    name: String!
    defs: [String]!,
    particle: String!,
    imgUrl: String,
    audioUrl: String,
    tags: [String],
    additionalInfo: String,
    examples: [String],
    transcription: String,
    user: ID!
}

type AuthUser {
    email: String!
    name: String!
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
    name: String!
}

input LoginInput {
    email: String!
    password: String!
}

type Query {
    user: User!
    words: [Word]!
}

type Mutation {
    saveWord(input: NewWordInput!): Word!
    signUp(input: SignUpInput): AuthUser!
    login(input: LoginInput): AuthUser!
}
`
module.exports = typeDefs;