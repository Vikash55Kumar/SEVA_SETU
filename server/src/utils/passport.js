import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
async function(request, accessToken, refreshToken, profile, done) {
  console.log("profile : ", profile);
  try {
    const existingUser = await User.findOne({ email: profile.emails[0].value });
    if (existingUser) {
      // If user exists, update their information
      existingUser.providerId = profile.id;
      existingUser.fullName = profile.displayName;
      existingUser.image = {
        url: profile.photos[0].value,
        filename: `google${profile.id}`,
      };
      await existingUser.save();
      return done(null, existingUser);
    } else {
      const newUser = new User({
        providerId: profile.id,
        provider: 'google',
        fullName: profile.displayName,
        email: profile.emails[0].value,
        image: {
          url: profile.photos[0].value,
          filename: `google${profile.id}`,
        },
        password: null, // Set password to null for Google OAuth users
      });

      // Save the new user and handle potential errors
      try {
        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        if (err.code === 11000) {
          // Handle duplicate key error
          console.error('User with this email already exists.');
          const existingUser = await User.findOne({ email: profile.emails[0].value });
          return done(null, existingUser); // Return the existing user
        } else {
          // Handle other errors
          console.error(err);
          return done(err, null);
        }
      }
    }
  } catch (err) {
    console.error("Error during authentication: ", err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
