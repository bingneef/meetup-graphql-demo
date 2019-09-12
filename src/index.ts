import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./services/graphql/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
