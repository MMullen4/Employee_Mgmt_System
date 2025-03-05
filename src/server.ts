import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import "./config/passport"; // Import OAuth configuration
import authRoutes from "./routes/authRoutes";
import oauthRoutes from "./routes/oauthRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/oauth", oauthRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log("Database connection error:", error));
