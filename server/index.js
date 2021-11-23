import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import userRoutes from './routes/user.routes.js';
import hbs from 'hbs';
import path from 'path';
//const {pathname: root} = new URL('../src', import.meta.url)


const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// required for the app when deployed to Heroku (in production)
app.set('trust proxy', 1)
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60000 * 60 // 60 * 1000 ms === 1 min *60 : 1h
    }
  })

)

app.set('view engine', 'hbs');
//TODO INVESTIGAR HARDCODEO
app.set('views', ('./views'));
app.use('/users', userRoutes);
app.get('/', (req, res) => { res.render('index') });




const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port': ${PORT}`)))
  .catch((error) => console.log(error.message));

