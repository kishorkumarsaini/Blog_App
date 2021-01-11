const path = require('path');
const { config, engine } = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const fileUpload = require('express-fileupload');
const postController = require('./controller/postController');
const userController = require('./controller/userController');
const expressSession = require('express-session');
const ConnectMongo = require('connect-mongo');
const edge = require('edge.js');


const redirectedIfAuthenticated = require('./middleware/redirectedIfAuthenticated')
const app = new express();
const auth = require('./middleware/auth');

const formValidation = require('./middleware/createNewPost');
//app.use('/createNewPost', formValidation);


app.use(expressSession({
    secret: 'secret'
}))

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/node-blog', {
        useNewUrlParser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database Connected Succesfully!'))
    .catch(err => console.error('Something went wrong', err))



const mongoStore = ConnectMongo(expressSession);
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(fileUpload());
app.use(express.static('public'));
app.use(engine);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('*', (req, res, next) => {

    edge.global('auth', req.session.userid);
    next();
});






app.get('/register', redirectedIfAuthenticated, userController.CreateNewUser);
app.post('/storeUser', redirectedIfAuthenticated, userController.StoreNewUser);
app.get('/login', redirectedIfAuthenticated, userController.login);
app.post('/loginUser', redirectedIfAuthenticated, userController.loginUser);
app.get('/logout', redirectedIfAuthenticated, userController.logout);

app.get('/', postController.homePage);

app.get('/createNewPost', auth, postController.createNewPost);

app.post('/StoreNewPost', auth, postController.storeNewPost);

//get single post
app.get('/:id', postController.getSinglePost);

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});




const port = process.env.PORT|| 4000;

app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});