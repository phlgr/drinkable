const { Router } = require('express');
const router = Router();

const { getAllIngredients } = require('../models/ingredients');

router.get('/', async function (req, res) {
  try {
    const list = await getAllIngredients();
    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(404).end('Error');
  }
});

module.exports = router;
