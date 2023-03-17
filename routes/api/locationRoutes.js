const router = require('express').Router();
const { Location, Trip, Traveller } = require('../../models');

// GET route to fetch all locations
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll({
      include: [{ model: Traveller, through: Trip, as: 'visitors' }],
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to fetch a single location by id
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Traveller, through: Trip, as: 'visitors' }],
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new location
router.post('/', async (req, res) => {
  try {
    const locationData = await Location.create(req.body);
    res.status(201).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route to delete a location by id
router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
