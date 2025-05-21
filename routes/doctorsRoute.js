import express from "express";
import Doctor from "../models/doctors.js";
import { getDoctorByName } from "../controllers/doctorControllers.js";
import { loginDoctor } from "../controllers/doctorControllers.js";

const router = express.Router();

// Get all doctors

router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});


router.get("/doctors/name/:name", getDoctorByName);
router.post('/doctor/login', loginDoctor);


export default router;
