const { Router } = require('express');

const router = Router();
const { getDrinkList } = require('../models/drinks');

const drinks = ['Cola', 'Sprite', 'Fanta'];

router.get('/list', async function (req, res) {
  try {
    const list = await getDrinkList(drinks);
    console.log(list);
    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.status(404).end('Error');
  }
});

router.get('/:id', function (req, res) {});

module.exports = router;
