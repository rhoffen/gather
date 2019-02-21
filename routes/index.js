const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create', async (req, res, next) => {
  res.render('create')
});

router.post('/items/create', async (req, res, next) => {
  console.log('res.body = ' + res.body);
  await Item.create(res.body);
  const items = await Item.find({});
  res.render('index', {items});
});

module.exports = router;
