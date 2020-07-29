require('dotenv').config();
const { testDBConnection } = require('./database');
const express = require('express');
const { authenticateToken } = require('./middlewares/auth');
const ComplaintsController = require('./controllers/ComplaintsController');
const AuthController = require('./controllers/AuthController');

const app = express();

//enable json parsing from request body
app.use(express.json());

app.get('/me', authenticateToken, (req, res) => {
  res.send(req.user)
});

app.post('/auth/register-admin', AuthController.registerAdmin);

app.post('/auth/register', AuthController.registerUser);
app.post('/auth/login', AuthController.loginUser);

app.get('/complaints', authenticateToken, ComplaintsController.list);
app.post('/complaints', authenticateToken, ComplaintsController.store);
app.patch('/complaints/:complaintId', authenticateToken, ComplaintsController.update);

// test the database connection and then run the express server
testDBConnection(() => {
  app.listen(parseInt(process.env.PORT), () => {
    console.log(`✅ api server is running on http://localhost:${process.env.PORT}`);
  })
});
