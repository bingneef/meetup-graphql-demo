import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://www.graphqlhub.com/graphql",
  fetch
});

class TwitterService {
  async getUser(identifier: string) {
    try {
      const { data } = await client.query({
        query: gql`
        query {
          twitter {
            user(identifier: name, identity: "${identifier}") {
              tweetsCount: tweets_count
              tweets(limit: 10) {
                createdAt: created_at
                retweetCount:retweet_count
                text
              }
            }
          }
        }
      `
      });

      return data.twitter.user;
    } catch {
      return null;
    }
  }
}

export default TwitterService;
