const express = require('express');

const bookRouter = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('server: bookRoutes');

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'NodeLibrary';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to the server');

          const db = client.db(dbName);

          const collection = await db.collection('books');

          const books = await collection.find().toArray();
          res.render(
            'books',
            {
              nav,
              title: 'Library',
              books,
            },
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'NodeLibrary';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to the server');

          const db = client.db(dbName);

          const collection = await db.collection('books');

          const book = await collection.findOne({ _id: new ObjectId(id) });
          debug(book);
          res.render(
            'book',
            {
              nav,
              title: 'Library',
              book,
            },
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}


module.exports = router;
