import { take } from "lodash";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import fs from "fs";
import personsData from "./persons.json";
import { Person } from "../../types/Person";

let localPersonsData: Person[] = personsData;

class DataService {
  async fetchPersonsFromRemote() {
    let offset = 0;
    let items = [];
    do {
      const { headers, data } = await axios.get(
        `https://api.meetup.com/Delft-Developers-Designers/members?sign=true&photo-host=public&page=200&fields=other_services,state&omit=group_profile,is_pro_admin,lat,lon&offset=${offset}`
      );
      offset++;
      items.push(...data.map((item: Person) => camelcaseKeys(item)));

      if (headers["x-total-count"] <= items.length) {
        await fs.writeFileSync(
          `${__dirname}/persons.json`,
          JSON.stringify(items)
        );
        return true;
      }
    } while (true);
  }

  getPersons(limit: number = 25) {
    return take(localPersonsData, limit);
  }

  addPerson(person: Person) {
    localPersonsData = [person, ...localPersonsData];
    return person;
  }
}

export default DataService;
