// express
// express jwt
// database?
// dotenv
require('dotenv').config();
const express = require('express');
const { authenticateToken } = require('./middlewares/auth');

const ComplaintsController = require('./controllers/Complaints');
const AuthController = require('./controllers/Auth');
// const { UserRegisterValidator } = require('./middlewares/validators');

const app = express();


//enable json parsing from request body
app.use(express.json());

//Routes:
// Register POST
// Login POST
// Complaint GET, POST
// Logout Post


app.get('/', (req, res) => res.send('OK'));

app.post('/auth/register-admin', AuthController.registerAdmin);

app.post('/auth/register', AuthController.registerUser);
app.post('/auth/login', AuthController.loginUser);

app.get('/complaints', authenticateToken, ComplaintsController.list);
app.post('/complaints', authenticateToken, ComplaintsController.store);

app.listen(parseInt(process.env.PORT), () => {
  console.log(`api server is running on http://localhost:${process.env.PORT}`);
})
