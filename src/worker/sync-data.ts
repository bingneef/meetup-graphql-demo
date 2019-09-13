import DataService from "../services/data";

async function main() {
  const service = new DataService();
  await service.fetchPersonsFromRemote();
}

main();
