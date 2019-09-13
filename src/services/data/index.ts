import { take } from "lodash";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import fs from "fs";
import personsData from "./persons.json";
import { Person } from "../../types/Person";

class DataService {
  persons = personsData;

  async fetchPersonsFromRemote() {
    let offset = 0;
    let items = [];
    do {
      const { headers, data } = await axios.get(
        `https://api.meetup.com/Delft-Developers-Designers/members?sign=true&photo-host=public&page=400&fields=other_services ,messaging_pref, privacy, state, stats, topics&omit=group_profile&offset=${offset}`
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

  getPersons() {
    return take(this.persons, 10);
  }

  addPerson(person: any) {
    this.persons = [person, ...this.persons];
  }
}

export default DataService;
