const { Router } = require('express');
const router = Router();

const {
  setParty,
  getParty,
  updateParty,
  filterPartyDrinks,
} = require('../models/parties');

router.post('/', async (req, res) => {
  try {
    const party = req.body;
    const partyId = await setParty(party);
    return res.json(partyId);
  } catch (e) {
    console.log(e);
    res.status(400).end('Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const partyId = req.params.id;
    const result = await getParty(partyId);
    return res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).end('Error');
  }
});

router.get('/:id/drinks', async (req, res) => {
  try {
    const partyId = req.params.id;
    const searchValue = req.query.q;
    const result = await filterPartyDrinks(partyId, searchValue.toString());
    return res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).end('Error');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const partyId = req.params.id;
    const partyResource = req.body;

    const result = await updateParty(partyId, partyResource);

    return res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).end("Couldn't update");
  }
});

module.exports = router;
