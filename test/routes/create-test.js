const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET request', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/items/create');
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'),'');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'),'');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'),'');
    });
  });

  describe('POST request', () => {
    //console.log(itemToCreate);
    //const itemToCreate = buildItemObject();
    it('creates and renders a new item', async () => {
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);
      const createdItem = await Item.findOne(itemToCreate);
      assert.isOk(createdItem,'item is not in database');
      });

    it('redirects to root', async () => {
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);
      assert.equal(302, response.status);
      assert.equal(response.headers.location, '/')
      });

      it('displays error message if no title submitted', async () => {
        const itemNoTitle = {
          description: 'Big Bear',
          imageUrl: 'https://www.placebear.com/200/300'
        };

        const response = await request(app)
          .post('/items/create')
          .type('form')
          .send(itemNoTitle);

        const createdItems = await Item.find({});
        assert.equal(createdItems.length, 0);
        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, 'form'), 'required');
      });

      it('displays error message if no description submitted', async () => {
        const itemNoDescription = {
          title: 'Big Bear',
          imageUrl: 'https://www.placebear.com/200/300'
        };

        const response = await request(app)
          .post('/items/create')
          .type('form')
          .send(itemNoDescription);

          const createdItems = await Item.find({});
          assert.equal(createdItems.length, 0);
          assert.equal(response.status, 400);
          assert.include(parseTextFromHTML(response.text, 'form'), 'required');
        });

        it('displays error message if no image URL submitted', async () => {
          const itemNoUrl = {
            title: 'Big bear',
            description: 'Really Big Bear'
          };

          const response = await request(app)
            .post('/items/create')
            .type('form')
            .send(itemNoUrl);

          const createdItems = await Item.find({});
          assert.equal(createdItems.length, 0);
          assert.equal(response.status, 400);
          assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });
});
