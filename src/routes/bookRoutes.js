const express = require('express');

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');
const bookController = require('../controllers/bookController');

const router = (nav) => {
  const { getIndex, getById, middlware } = bookController(bookService, nav);
  bookRouter.use(middlware);
  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
};


module.exports = router;
