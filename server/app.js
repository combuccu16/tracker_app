const express = require('express');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const connect = require('./connect/connect');
const authRouter = require('./routes/authRouter');
const itemRouter = require("./routes/itemsRouter")
const validateRouter = require("./routes/validateRouter")
const settingsRouter = require("./routes/settingsRoute")
const userRouter = require("./routes/userRouter")
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

connect();

app.use(express.json());



app.use(session({
  secret: 's3cUr3!K3y_2025_$tr0ng#SecreTKey@987654321',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/testDB', // or your actual DB URI
    ttl: 24 * 60 * 60, // 1 day
    autoRemove: 'native',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: false // true only if HTTPS
  }
}));

app.use('/api/auth', authRouter);
app.use('/api/items' , itemRouter)
app.use('/api/validate' , validateRouter)
app.use('/api/settings' , settingsRouter)
app.use('api/user' , userRouter)
app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
