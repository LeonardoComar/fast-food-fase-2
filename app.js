const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const sequelize = require('./src/infrastructure/database/database');
const authRoutes = require('./src/infrastructure/routes/authRoutes');
const productRoutes = require('./src/infrastructure/routes/productRoutes');
const orderRoutes = require('./src/infrastructure/routes/orderRoutes');

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.get('/', (req, res) => {
  if (req.session.user) {
    res.render('users/index', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.log('Error connecting to the database:', err);
});
