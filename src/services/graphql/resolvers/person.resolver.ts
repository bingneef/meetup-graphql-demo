import { get, truncate } from "lodash";
import DataService from "../../data/index";
import TwitterService from "../../twitter";
import { Person, PersonSearchArgs, PersonBioArgs } from "../../../types";

export default {
  Query: {
    person: async (
      _: unknown,
      args: PersonSearchArgs,
      ___: unknown,
      ____: unknown
    ) => {
      const service = new DataService();

      return service
        .getPersons()
        .find(({ name }) => name.toLowerCase() === args.name.toLowerCase());
    },
    persons: async (_: unknown, __: unknown, ___: unknown, ____: unknown) => {
      const service = new DataService();
      return service.getPersons();
    }
  },
  Mutation: {
    addPerson: async (_: unknown, args: any, __: unknown, ___: unknown) => {
      return {};
    }
  },
  Person: {
    country: async (obj: Person, _: any, __: unknown, ___: unknown) => {
      return obj.localizedCountryName;
    },
    twitter: async (obj: any, _: unknown, __: unknown, ___: unknown) => {
      const identifier = get(obj, "otherServices.twitter.identifier", null);
      if (!identifier) {
        return null;
      }

      const service = new TwitterService();
      return service.getUser(identifier);
    },
    bio: async (
      obj: Person,
      args: PersonBioArgs,
      __: unknown,
      ___: unknown
    ) => {
      return truncate(obj.bio, { length: args.size });
    }
  }
};
