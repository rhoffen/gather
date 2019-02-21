const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Item',
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String
    },
  })
);
