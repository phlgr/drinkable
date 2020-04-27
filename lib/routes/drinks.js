const { Router } = require('express');
const router = Router();

const { getDrinkList, getDrinkDetails } = require('../models/drinks');

router.get('/list', async function (req, res) {
  try {
    const body = req.body;
    const list = await getDrinkList(body.ingredients);
    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(404).end('Error');
  }
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;

  try {
    const details = await getDrinkDetails(id);
    return res.json(details);
  } catch (error) {
    console.log(error);
    return res.status(404).end('Error');
  }
});

module.exports = router;
