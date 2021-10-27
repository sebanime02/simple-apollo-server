import { ApolloServer, gql } from "apollo-server";
import notes from "./notes.js";

// The GraphQL schema
const typeDefs = gql`
    type Query {
        hello: String,
        getNotes: [Note],
        getNoteById(id: Int): Note
    }

    type Note {
        id: Int!,
        title: String!,
        description: String!,
        isThisYear: Boolean!
    }

    type Mutation {
        createNote(
            title: String!
            description: String!,
            year: Int
        ): Note
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => "world",
        getNotes: () => notes,
        getNoteById: (_, { id }) => notes.find((note) => note.id === id) 
    },
    Note: {
        id: (root) => root.id,
        title: (root) => root.title,
        description: (root) => root.description,
        isThisYear: (root) => root.year === 2021
    },
    Mutation: {
        createNote: (_, note) => {
            const lastIndex = notes.length;
            console.log('last Index', lastIndex);
            notes.push(
                {
                    ...note, 
                    id: lastIndex + 1,
                    year: 2021
                }
            );
            return note;
        } 
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready listening at: ${url}`);
});
