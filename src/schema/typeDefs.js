import gql from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
        password: String!
        role: String!
    }

    type Query {
        users: [ User! ]
    }
`;

export { typeDefs };