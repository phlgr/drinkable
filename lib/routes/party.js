const { Router } = require('express');
const router = Router();

const { setParty, getParty } = require('../models/party');

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
    const party = await getParty(partyId);
    return res.json(party);
  } catch (e) {
    console.log(e);
    res.status(400).end('Error');
  }
});

module.exports = router;
