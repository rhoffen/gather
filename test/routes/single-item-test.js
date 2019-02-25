const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('single item rendering', () => {
    it('returns requested items description', async () => {
      //setup
      const newItem = await seedItemToDatabase();
      const newItemId = newItem._id;
      //exercise
      const getPath = '/items/' + newItemId;
      const response = await request(app)
          .get(getPath);
      //verify
      assert.include(parseTextFromHTML(response.text, '#item-title'), newItem.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), newItem.description);
    });
  });
});
