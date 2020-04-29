const { Router } = require('express');
const router = Router();

const { setDrinksDB } = require('../models/admin');

router.get('/drinks', async function (req, res) {
  try {
    const response = await setDrinksDB();
    return res.json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).end('Error');
  }
});

module.exports = router;
