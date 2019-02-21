const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('User vists create page and posts a new item', () => {
  describe('clicks submit button', () => {
    it('sees item rendered', () => {
      //setup
      browser.url('/items/create');
      const itemToCreate = buildItemObject();
      //exercise
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      //verify
      assert.include(browser.getText('body'), itemToCreate.title);
      assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
    });



  });
});
