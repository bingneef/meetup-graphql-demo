import { take } from "lodash";
import { Twitter, Pagination } from "../../../types";

export default {
  Twitter: {
    tweets: async (
      obj: Twitter,
      args: Pagination,
      __: unknown,
      ___: unknown
    ) => {
      return take(obj.tweets, args.limit || 10);
    }
  }
};
