const express = require('express');

const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const sql = require('mssql');


const app = express();
const port = process.env.PORT || 8000;

// SQL DB connection
// const config = {
//   user: 'faizal',
//   password: 'Password1',
//   server: 'fhnodelibrary.database.windows.net',
// You can use 'localhost\\instance' to connect to named instance
//   database: 'NodeLibrary',

//   options: {
//     encrypt: true, // Use this if you're on Windows Azure
//   },
// };
// sql.connect(config).catch(err => debug(err));


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library',
    nav,
  });
});

app.listen(8000, () => debug(`We are live on port ${chalk.magenta(port)}`));
