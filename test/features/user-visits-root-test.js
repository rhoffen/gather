const {assert} = require('chai');
const {seedItemToDatabase, connectDatabaseAndDropData, disconnectDatabase} = require('../test-utils');
const request = require('supertest');
const app = require('../../app');

describe('User visits root', () => {

  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });

  describe('User clicks on "create" link', () => {
    it('navigates to "create.html"',() => {
      browser.url('/');
      browser.click('a[href="/items/create"]');
      assert.include(browser.getText('.form-title'),'Create');
    });
  });

  describe('User clicks on "delete" link', () => {
    it('deletes the item from the root page', async () => {
      connectDatabaseAndDropData;
      //setup - user goes to root page and deletes an item
      const item = await seedItemToDatabase();
      const response = await request(app)
        .get('/');
      //browser.url('/');
      assert.include(response.text, `item-${item.id}`);

      await request(app)
        .post(`/items/${item.id}/delete`);

      const response2 = await request(app)
        .get('/');

      //verify - created item no longer on page
      assert.notInclude(response2.text, `item-${item.id}`);
      disconnectDatabase;
    });
  });
});
