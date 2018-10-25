
const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('server:bookRoutes');

function router(nav) {
  const books = [


    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Bleckenroth',
      read: false,
    },
    {
      title: 'Harry Potter',
      genre: 'Fiction',
      author: 'J.K Rowling',
      read: false,
    },
    {
      title: 'Think and Grow Rich',
      genre: 'Non-Fiction',
      author: 'Dale Carnegie',
      read: false,
    },
    {
      title: 'You are a Badass',
      genre: 'Non-Fiction',
      author: 'Bob Sincero',
      read: false,
    },
    {
      title: 'Gemeni Night',
      genre: 'Fiction',
      author: 'Stacy Trammers',
      read: false,
    },
    {
      title: 'The King of Capital',
      genre: 'Biography',
      author: 'David Carey',
      read: false,
    },
  ];

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        res.render('books', {
          nav,
          title: 'Library',
          books: recordset,
        });
      }());
    });


  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id');
        debug(recordset);
        res.render('book', {
          nav,
          title: 'Library',
          book: recordset[0],
        });
      }());
    });

  return bookRouter;
}

module.exports = router;
