const path = require('path');
const express = require('express');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});