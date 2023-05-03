import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import User from '../models/User.js';

export const passportSetup = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ id: profile.id });
            if (user) {
                done(null, user);
            } else {
                const newUser = await User.create({
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value
                });
                done(null, newUser);
            }
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findOne({ id });
        done(null, user);
    })
}