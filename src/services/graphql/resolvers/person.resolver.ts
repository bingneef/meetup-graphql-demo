import { get } from "lodash";
import DataService from "../../data/index";
import TwitterService from "../../twitter";
import { Person } from "../../../types";

export default {
  Query: {
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
    country: async (obj: Person, args: any, __: unknown, ___: unknown) => {
      return obj.localizedCountryName;
    },
    twitter: async (obj: any, args: any, __: unknown, ___: unknown) => {
      const identifier = get(obj, "otherServices.twitter.identifier", null);
      if (!identifier) {
        return null;
      }

      const service = new TwitterService();
      return service.getUser(identifier);
    }
  }
};
