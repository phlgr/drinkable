const { Router } = require('express');
const router = Router();

const { setParty } = require('../models/party');

router.post('/', async (req, res) => {
  try {
    const party = req.body;
    const partyID = await setParty(party);
    return res.json(partyID);
  } catch (e) {
    console.log(e);
    res.status(400).end('Error');
  }
});

module.exports = router;
