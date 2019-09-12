import { PubSub } from "apollo-server";
import * as path from "path";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const resolversArray = fileLoader(path.join(__dirname, "./resolvers"));
export const resolvers = mergeResolvers(resolversArray);

const typesArray = fileLoader(path.join(__dirname, "./types"));
export const typeDefs = mergeTypes(typesArray, { all: true });

export const pubsub = new PubSub();
