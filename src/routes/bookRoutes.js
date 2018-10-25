
const express = require('express');

const bookRouter = express.Router();

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
      res.render('books', {

        title: 'Library',
        books,
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('book', {
        nav,
        title: 'Library',
        book: books[id],
      });
    });

  return bookRouter;
}

module.exports = router;
