import asciify from "asciify-image";
import { Photo } from "../../../types";

export default {
  Photo: {
    ascii: async (obj: Photo, _: unknown, __: unknown, ___: unknown) => {
      try {
        const asciified = await asciify(obj.photoLink, {
          fit: "box",
          color: false,
          width: 40,
          format: "string"
        });
        return asciified
          .toString()
          .replace(/ /g, ` `)
          .replace(/\n/g, `         `);
      } catch {
        return null;
      }
    }
  }
};
