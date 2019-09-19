import asciify from "asciify-image";
import { Photo } from "../../../types";

export default {
  Photo: {
    ascii: async (obj: Photo, _: unknown, __: unknown, ___: unknown) => {
      try {
        const asciified = await asciify(obj.photoLink, {
          fit: "box",
          color: false,
          width: 44,
          format: "string"
        });
        const formatted = asciified
          .toString()
          .replace(/ /g, ` `)
          .replace(/\n/g, ` `);

        return `
        ${formatted}`;
      } catch {
        return null;
      }
    }
  }
};
