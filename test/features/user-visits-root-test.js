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
      await browser.url('/');
      assert.include(await browser.getText('body'), item.title);
      await browser.click(`#delete-${item._id}`);
//      console.log(`after delete, body = ${browser.getText('body')}`);
      await browser.url('/');
      assert.notInclude(await browser.getText('body'), item.title);
      disconnectDatabase;
    });
  });
});
