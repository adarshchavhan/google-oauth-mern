import express from 'express';
import passport from 'passport';
import { logout, myProfile } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000'
}));

router.get('/me', auth, myProfile);

router.get('/logout', auth, logout);

export default router;