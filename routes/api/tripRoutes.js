const router = require('express').Router();
const { Trip, Traveller, Location } = require('../../models');

// GET route to fetch all trips
router.get('/', async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      include: [Traveller, Location],
    });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new trip
router.post('/', async (req, res) => {
  try {
    const tripData = await Trip.create(req.body);
    res.status(201).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route to delete a trip by id
router.delete('/:id', async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with that id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
