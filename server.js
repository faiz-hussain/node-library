const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');


const app = express();
const port = process.env.PORT || 8000;

const config = {
  user: 'faizal',
  password: 'Password1',
  server: 'fhnodelibrary.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'NodeLibrary',

  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

const bookRouter = require('./src/routes/bookRoutes')(nav);


app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library',
  });
});

app.listen(8000, () => console.log(`We are live on port ${chalk.magenta(port)}`));
