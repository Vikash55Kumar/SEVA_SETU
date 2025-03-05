import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Employee } from '../models/employee.model.js';
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
        // Check if Employee exists by Google ID first
        let existingEmployee = await Employee.findOne({ providerId: profile.id });
        
        // If Employee is not found by Google ID, check by email
        if (!existingEmployee) {
          existingEmployee = await Employee.findOne({ email: profile.emails[0].value });
        }

        if (existingEmployee) {
          // Update Employee's Google ID if missing
          if (!existingEmployee.providerId) {
            existingEmployee.providerId = profile.id;
          }

          // Update Employee's full name and image in case they have changed
          existingEmployee.fullName = profile.displayName;
          existingEmployee.image = {
            url: profile.photos[0].value,
            filename: `google${profile.id}`,
          };
          
          await existingEmployee.save(); // Save any updates
          return done(null, existingEmployee);
        } else {
          // No Employee exists, create a new one
          const number = Math.floor(Math.random() * 1000000);
          const newEmployee = new Employee({
            providerId: profile.id,
            provider: 'google',
            fullName: profile.displayName,
            email: profile.emails[0].value,
            image: {
              url: profile.photos[0].value,
              filename: `google${profile.id}`,
            },
            phoneNumber: number, // Default value for phone
            password: null, // No password for OAuth Employees
          });

          await newEmployee.save();
          console.log("New Employee created:", newEmployee);
          return done(null, newEmployee);
          
        }
      } catch (err) {
        console.error("Error during authentication:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize and Deserialize user (for session management)
passport.serializeUser((employee, done) => {
  done(null, employee.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const employee = await Employee.findById(id);
    done(null, employee);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
