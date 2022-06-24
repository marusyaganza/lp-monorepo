const {gql}  = require('apollo-server');

const typeDefs = gql`

enum Role {
    ADMIN,
    MEMBER,
    GUEST
}

enum Language {
    ENGLISH,
    SPANISH
}

type User {
    email: String!
    name: String!
    # words: [Word]!
    id: ID
    role: Role
}

type Conjugation {
    yo: String!
    tu: String!
    el: String!
    nosotros: String!
    vosotros: String!
    ellos: String!
}

type Word {
    id: ID!,
    lang: Language!
    name: String!
    user: ID!,
    defs: [String]!,
    particle: String!,
    imgUrl: String,
    audioUrl: String,
    tags: [String],
    additionalInfo: String,
    examples: [String],
    transcription: String,
    isIrregularVerb: Boolean,
    conjugation: Conjugation
}

type AuthUser {
    email: String!
    name: String!
    createdAt: String!
    role: Role!
    token: String!
    id: ID!
  }

input ConjugationInput {
    yo: String!
    tu: String!
    el: String!
    nosotros: String!
    vosotros: String!
    ellos: String!
}

input NewWordInput {
    lang: Language!
    name: String!
    defs: [String]!,
    particle: String!,
    imgUrl: String,
    audioUrl: String,
    tags: [String],
    additionalInfo: String,
    examples: [String],
    transcription: String,
    isIrregularVerb: Boolean,
    conjugation: ConjugationInput
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
    irregularVerbs: [Word]!
}

type Mutation {
    saveWord(input: NewWordInput!): Word!
    signUp(input: SignUpInput): AuthUser!
    login(input: LoginInput): AuthUser!
}
`
module.exports = typeDefs;