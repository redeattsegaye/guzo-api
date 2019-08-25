const {
  citiesSeeds,
  busesSeeds
} = require('../../seeds');

module.exports = async function (server) {
  await server.models.City.find({}, (err, data) => {
    if (!data.length) {
      citiesSeeds.forEach(city => {
        server.models.City.create(city);    
      });
    }
  });

  await server.models.BusOwner.find({}, (err, data) => {
    if (!data.length) {
      busesSeeds.forEach(busOwner => {
        server.models.BusOwner.create(busOwner);    
      });
    }
  });

  await server.models.BusOwner.find({}, (err, busOwners) => {
    busOwners.forEach(({ id, username }) => {
      [1,2,3,4,5,6,7].forEach((i) =>
      server.models.Bus.create({
        "name": `${username.replace("_", "")} #${i}`,
        "description": `${username.replace("_", "")} owned bus`,
        "model": "unspecified vehicle model",
        "license_plate_code": "1",
        "license_plate_number": `${[1,2,3,4,5,6].map(_ => Math.floor(Math.random() * 10)).join("")}`,
        "license_plate_location": "A.A",
        "color": "white",
        "rows": 13,
        "columns": 4,
        userId: id
      }))
    });
  });
}