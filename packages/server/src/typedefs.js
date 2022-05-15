const {gql}  = require('apollo-server');

const typeDefs = gql`
type User {
    email: String!
    name: String!
    words: [Word]!
    id: ID
}

type Word {
    id: ID!,
    defs: [String]!,
    particle: String!,
    imgUrl: String,
    audioUrl: String,
    tags: [String]!,
    additionalInfo: String,
    examples: [String],
    user: User
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

type Query {
    user: User!,
    words(user: ID!): [Word]!,
}

type Mutation {
    saveWord(input: NewWordInput!): Word!
}
`
module.exports = typeDefs;