const {assert} = require('chai');

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
      browser.click('a[href="/items/create.html"]');
      assert.include(browser.getText('.form-title'),'Create');
    });
  });
});
