const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const path = require('path');


const app = express();
const port = process.env.PORT || 8000;


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);


app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library'
  });
});

app.listen(8000, () => console.log(`We are live on port ${chalk.magenta(port)}`));
