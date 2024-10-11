import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log('Google Profile:', profile);
      console.log("AccessToken:", accessToken);
      console.log("RefreshToken:", refreshToken);

      try {
        // Check if user exists by Google ID first
        let existingUser = await User.findOne({ providerId: profile.id });
        
        // If user is not found by Google ID, check by email
        if (!existingUser) {
          existingUser = await User.findOne({ email: profile.emails[0].value });
        }

        if (existingUser) {
          // Update user's Google ID if missing
          if (!existingUser.providerId) {
            existingUser.providerId = profile.id;
          }

          // Update user's full name and image in case they have changed
          existingUser.fullName = profile.displayName;
          existingUser.image = {
            url: profile.photos[0].value,
            filename: `google${profile.id}`,
          };
          
          await existingUser.save(); // Save any updates
          return done(null, existingUser);
        } else {
          // No user exists, create a new one
          const number = Math.floor(Math.random() * 1000000);
          const newUser = new User({
            providerId: profile.id,
            provider: 'google',
            fullName: profile.displayName,
            email: profile.emails[0].value,
            image: {
              url: profile.photos[0].value,
              filename: `google${profile.id}`,
            },
            phoneNumber: number, // Default value for phone
            password: null, // No password for OAuth users
          });

          await newUser.save();
          console.log("New user created:", newUser);
          return done(null, newUser);
          
        }
      } catch (err) {
        console.error("Error during authentication:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize and Deserialize user (for session management)
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
