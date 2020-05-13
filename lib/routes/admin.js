const { Router } = require('express');
const router = Router();

const { setDrinksDB, setExcludedIngredients } = require('../models/admin');

router.get('/drinks', async function (req, res) {
  try {
    const response = await setDrinksDB();
    return res.json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).end('Error');
  }
});

router.post('/excludedIngredients', async function (req, res) {
  try {
    const excludedIngredients = req.body;
    const response = await setExcludedIngredients(excludedIngredients);
    return res.json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).end('Error');
  }
});

module.exports = router;
