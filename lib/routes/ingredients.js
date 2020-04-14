const { Router } = require('express');

const router = Router();

const ingredients = ['Cola', 'Sprite', 'Fanta'];

router.get('/', function (req, res) {
  try {
    return res.json(ingredients);
  } catch (error) {
    console.log(error);
    return res.status(404).end('Error');
  }
});

module.exports = router;
