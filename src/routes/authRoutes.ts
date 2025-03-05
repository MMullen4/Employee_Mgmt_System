
import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

const router = Router();

// Register User
router.post("/register", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await UserRepository.findOneBy({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const newUser = UserRepository.create({ email, password, role });
        await UserRepository.save(newUser);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserRepository.findOneBy({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
