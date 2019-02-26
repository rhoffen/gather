const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('delete POST request', () => {
    it('deletes an item', async () => {
      //setup - creates an item
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);
      const createdItem = await Item.findOne(itemToCreate);
      const createdItemId = createdItem._id;
      //exercise - deletes the item
      const response2 = await request(app)
        .post('/items/' + createdItemId + '/delete')
        .type('form')
        .send();
      const deletedItem = await Item.findOne(itemToCreate);
      //verify - assert that created item is no longer in database
      assert.isNotOk(deletedItem,'item is still in database');
      });
  });
});
