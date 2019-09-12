import response1 from "./response1.json";
import response2 from "./response2.json";
import response3 from "./response3.json";
import response4 from "./response4.json";

class DataService {
  persons = [...response1, ...response2, ...response3, ...response4];

  getPersons() {
    return this.persons;
  }

  addPerson(person: any) {
    this.persons = [person, ...this.persons];
  }
}

export default DataService;
