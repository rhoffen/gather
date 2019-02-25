const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
const itemToCreate = buildItemObject();

// Add your tests below:
describe('User visits single item view', () => {
  describe('User vists create page and posts a new item', () => {
    describe('clicks submit button', () => {
      it('sees item rendered on main page', () => {
        //setup
        browser.url('/items/create');
        //const itemToCreate = buildItemObject();
        //exercise
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        //verify
        browser.url('/');
        assert.include(browser.getText('body'), itemToCreate.title);
        assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
      });
    });
  });
  describe('User clicks on view button', () => {
    it('Shows item description', () => {
        //browser.url('/');
        console.log('**body of / :' + browser.getText('body'));
        console.log('***itemToCreate = ' + itemToCreate);
        browser.click('.view-button a');
        console.log('body after clicking view button: ' + browser.getText('body'));
        //const createdItem = Item.findOne(itemToCreate);
        //browser.url('/items/' + createdItem._id);
        //browser.url('single');
        //assert.include(browser.getText('body'), createdItem.description);
    });
  });
});
