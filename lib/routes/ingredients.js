const { Router } = require('express');
const router = Router();

const {
  getAllIngredients,
  filterIngredients,
} = require('../models/ingredients');

router.get('/', async function (req, res) {
  try {
    const list = await getAllIngredients();
    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(404).end('Error');
  }
});

router.get('/filter', async function (req, res) {
  try {
    const searchValue = req.query.q;
    const filteredList = await filterIngredients(searchValue.toString());
    // const filteredList = await filterAllIngredients();
    return res.json(filteredList);
  } catch (e) {
    console.log(e);
    return res.status(404).end('Error');
  }
});

module.exports = router;
