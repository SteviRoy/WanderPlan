const router = require('express').Router();
const { Traveller, Location, Trip } = require('../../models');

// GET route to fetch all travellers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll({
      include: [{ model: Location, through: Trip, as: 'planned_trips' }],
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to fetch a single traveller by id
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location, through: Trip, as: 'planned_trips' }],
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new traveller
router.post('/', async (req, res) => {
  try {
    const travellerData = await Traveller.create(req.body);
    res.status(201).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route to delete a traveller by id
router.delete('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
