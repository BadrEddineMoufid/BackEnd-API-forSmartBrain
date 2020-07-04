const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//importing controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//setting up the knex cnx to DB
const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});



const app = express();

//using bodyparser for parsing json
app.use(bodyParser.json());
app.use(cors());

//root endpoint just for testing if the server is up 
app.get('/', (req, res) => {
    res.send('if this shows up then then app is working hhhh');
})

//sign in route
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

//register route
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//profile route--- by user id
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

//image related routes
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})



//listenning for req
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on Port ${process.env.PORT}`);
})
