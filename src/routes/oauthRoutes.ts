
import { Router } from "express";
import passport from "passport";

const router = Router();

// Redirect to Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback URL
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/failure" }),
    (req, res) => {
        res.redirect("/dashboard"); // Redirect to frontend/dashboard
    }
);

// Logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        req.session.destroy(() => res.redirect("/"));
    });
});

export default router;
