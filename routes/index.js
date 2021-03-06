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

router.get('/items/:id', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  res.render('single', {item});
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  };
});

router.post('/items/:itemId/delete', async (req, res, next) =>  {
  try {
    await Item.findByIdAndRemove(req.params.itemId);
  } catch(e) {

  } finally {
    res.redirect('/');
  };
});

module.exports = router;
