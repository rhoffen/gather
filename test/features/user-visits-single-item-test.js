const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
const itemToCreate = buildItemObject();

// Add your tests below:
describe('User visits single item view', () => {
    it('shows item description', () => {
    //setup - visit create page and submit new item
    browser.url('/items/create');
    browser.setValue('#title-input', itemToCreate.title);
    browser.setValue('#description-input', itemToCreate.description);
    browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
    browser.click('#submit-button');

    //exercise - click on view button from main page
    browser.click('.view-button a');

    //verify
    assert.include(browser.getText('body'), itemToCreate.description);
  });
});
