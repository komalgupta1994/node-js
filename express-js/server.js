const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// express is middleware and framework for makes life easy 
const app = express();

// Set up Pug template engine
// app.set('view engine', 'pug');

// ----------------------------

// Set up handlebar templete engine
// const expressHbs = require('express-handlebars');
// app.engine('handlebars', expressHbs.engine({ layoutDir: 'views/layouts', defaultLayout: 'main-layout' }));
// app.set('view engine', 'handlebars');

// ----------------------------

// Set up EJS template engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// this is use for expose the static/public files/folder to outside of world
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.router);

app.use(shopRoutes);

app.use('/', (req, res) => {
    // res.send('<h1>Page Not Found</h1>')
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { docTitle: 'Page Not Found from EJS' });
})

app.listen(3001);