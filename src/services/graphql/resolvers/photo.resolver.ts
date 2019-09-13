import asciify from "asciify-image";
import { Photo } from "../../../types";

export default {
  Photo: {
    ascii: async (obj: Photo, _: unknown, __: unknown, ___: unknown) => {
      return new Promise((resolve, _) => {
        asciify(
          obj.photo_link,
          {
            fit: "box",
            color: false,
            width: 40,
            format: "string"
          },
          (_: unknown, asciified: string) => {
            if (asciified === undefined) {
              resolve();
            } else {
              const converted = asciified
                .toString()
                .replace(/ /g, ` `)
                .replace(/\n/g, `                 `);

              resolve(`\n ${converted}`);
            }
          }
        );
      });
    }
  }
};
