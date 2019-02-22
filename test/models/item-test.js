const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('#title', () => {
    it('is a string', () => {
      //setup
      const titleNotString = 5;
      //exercise
      const item = new Item({
        title: titleNotString
      });
      //verify
      assert.strictEqual(item.title, titleNotString.toString());
    });

    it('is required', async () => {
      const item = new Item({title: ''});
      await item.validateSync();
      const errMsg = await item.errors.title.message;
      assert.equal(errMsg, 'Path `title` is required.');
    });
  });

  describe('#description', () => {
    it('is a string', () => {
      //setup
      const descriptionNotString = 5;
      //exercise
      const item = new Item({
        description: descriptionNotString
      });
      //verify
      assert.strictEqual(item.description, descriptionNotString.toString());
    });

    it('is required', async () => {
      const item = new Item({description: ''});
      await item.validateSync();
      const errMsg = await item.errors.description.message;
      assert.equal(errMsg, 'Path `description` is required.');
    });
  });

  describe('#imageUrl', () => {
    it('is a string', () => {
      //setup
      const UrlNotString = 5;
      //exercise
      const item = new Item({
        imageUrl: UrlNotString
      });
      //verify
      assert.strictEqual(item.imageUrl, UrlNotString.toString());
    });

    it('is required', async () => {
      const item = new Item({title: ''});
      await item.validateSync();
      const errMsg = await item.errors.imageUrl.message;
      assert.equal(errMsg, 'Path `imageUrl` is required.');
    });
  });
});
