
import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { EmployeeRepository } from "./EmployeeRepository";

const router = Router();

// Get all employees (protected)
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const employees = await EmployeeRepository.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
});

export default router;
