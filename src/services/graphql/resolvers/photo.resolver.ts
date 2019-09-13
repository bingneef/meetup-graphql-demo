import imageToAscii from "image-to-ascii";
import { Photo } from "../../../types";

export default {
  Photo: {
    ascii: async (obj: Photo, args: any, __: unknown, ___: unknown) => {
      return new Promise((resolve, _) => {
        imageToAscii(
          obj.photo_link,
          {
            colored: false,
            size: {
              width: 40
            },
            size_options: {
              screen_size: {
                width: 40
              }
            }
          },
          (_: unknown, converted: string) => {
            if (converted === undefined) {
              resolve();
            } else {
              const formatted = converted
                .replace(/ /g, ` `)
                .replace(/\n/g, `                 `);

              resolve(`\n ${formatted}`);
            }
          }
        );
      });
    }
  }
};
