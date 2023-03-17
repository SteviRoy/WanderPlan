const Traveller = require('./traveller');
const Location = require('./location');
const Trip = require('./trip');

// Define the many-to-many relationship between Travellers and Locations through Trips
Traveller.belongsToMany(Location, {
  through: {
    model: Trip,
    unique: false
  },
  as: 'planned_trips',
  foreignKey: 'traveller_id'
});

Location.belongsToMany(Traveller, {
  through: {
    model: Trip,
    unique: false
  },
  as: 'visitors',
  foreignKey: 'location_id'
});

// Define the one-to-many relationship between Trips and Travellers
Trip.belongsTo(Traveller, {
  foreignKey: 'traveller_id'
});

// Define the one-to-many relationship between Trips and Locations
Trip.belongsTo(Location, {
  foreignKey: 'location_id'
});

module.exports = { Traveller, Location, Trip };
