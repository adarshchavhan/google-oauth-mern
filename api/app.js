import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import { connectDb } from './config/db.js';
import { passportSetup } from './utils/passportSetup.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
dotenv.config({
    path: './config/.env'
});
connectDb();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(session({
    name: 'access_token',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 30*24*60*60*1000
    }
}));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable('trust proxy')

passportSetup();

// routes
app.use('/api/auth', authRoutes);

// app start
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log('app is running')
});
