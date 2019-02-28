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
        //The below commented-out test is server-based test, which confirms that the deleted item is no longer on the page, but does not user browser methods to exercise.
            //const response = await request(app)
            //.get('/');
            // assert.include(response.text, `item-${item.id}`);
            // //Exercise
            // await request(app)
            //   .post(`/items/${item.id}/delete`);
            //
            // const response2 = await request(app)
            //   .get('/');
            // //Verify - created item no longer on page
            //assert.notInclude(response2.text, `item-${item.id}`);
      //The test below is browser-based; In index.handlebars, the delete button has a listener on it based on a script at the bottom of the page.
      //The form is submitted through this listener, and not through a submit button.
      //This works fine in the app, but causes the test to fail with the commented-out browser.click() action.
      //Wrapping the form elements in a 'button[type="submit"]' allows this test to pass, but affects the appearance of the delete button in the app.
      //I will leave the submit button in the app while I am testing, but will likely remove it before deployment.
      await browser.url('/');
      assert.include(await browser.getText('body'),item.title);
      //await browser.click(`#delete-${item._id}`);
      await browser.click(`#delete-${item._id} button[type="submit"]`);
      //verify - created item no longer on page
      assert.notInclude(await browser.getText('body'),item.title);
      disconnectDatabase;
    });
  });
});
