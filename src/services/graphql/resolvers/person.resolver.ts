import { get, truncate } from "lodash";
import { pubsub } from "../schema";
import DataService from "../../data/index";
import TwitterService from "../../twitter";
import {
  Person,
  PersonInput,
  PersonSearchArgs,
  PersonBioArgs,
  Pagination
} from "../../../types";

const PERSON_ADDED = "PERSON_ADDED";

export default {
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator([PERSON_ADDED])
    }
  },
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
        .find(
          ({ name }) => ~name.toLowerCase().indexOf(args.name.toLowerCase())
        );
    },
    persons: async (
      _: unknown,
      args: Pagination,
      ___: unknown,
      ____: unknown
    ) => {
      const service = new DataService();
      return service.getPersons(args);
    }
  },
  Mutation: {
    addPerson: async (
      _: unknown,
      args: PersonInput,
      __: unknown,
      ___: unknown
    ) => {
      const service = new DataService();
      const params = {
        name: args.input.name,
        bio: args.input.bio,
        photo: !!args.input.photoUrl
          ? {
              highresLink: args.input.photoUrl,
              photoLink: args.input.photoUrl,
              thumbLink: args.input.photoUrl
            }
          : undefined
      };

      const person = service.addPerson(params);
      pubsub.publish(PERSON_ADDED, { personAdded: person });
      return person;
    }
  },
  Person: {
    country: async (obj: Person, _: any, __: unknown, ___: unknown) => {
      return obj.localizedCountryName;
    },
    facebook: async (obj: any, _: unknown, __: unknown, ___: unknown) => {
      return get(obj, "otherServices.facebook", null);
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
      if (!obj.bio) {
        return null;
      }
      return truncate(obj.bio, { length: args.size || obj.bio.length });
    }
  }
};
