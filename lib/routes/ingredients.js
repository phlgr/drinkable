const { Router } = require('express');
const router = Router();

const {
  getAllIngredients,
  filterIngredients,
} = require('../models/ingredients');

router.get('/', async function (req, res) {
  const searchValue = req.query.q;

  try {
    const list = await (searchValue
      ? filterIngredients(searchValue.toString())
      : getAllIngredients());

    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(404).end('Error');
  }
});

module.exports = router;
