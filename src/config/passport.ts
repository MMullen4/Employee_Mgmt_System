
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserRepository } from "../repositories/UserRepository";
import { generateToken } from "../utils/jwt";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await UserRepository.findOneBy({ email: profile.emails?.[0].value });

                if (!user) {
                    user = UserRepository.create({
                        email: profile.emails?.[0].value,
                        password: "", // OAuth users don't use passwords
                        role: "employee",
                    });
                    await UserRepository.save(user);
                }
                const token = generateToken(user);

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserRepository.findOneBy({ id });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
