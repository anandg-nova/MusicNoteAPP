import express from 'express';
import { body } from 'express-validator';
import { sendOTP, verifyOTP, getCurrentUser } from '../controllers/authController';
import { auth } from '../middleware/auth';
import { jwtService } from '../services/jwtService';

const router = express.Router();

// Validation middleware
const phoneNumberValidation = body('phoneNumber')
  .matches(/^[0-9]{10}$/)
  .withMessage('Phone number must be exactly 10 digits');

const otpValidation = body('otp')
  .isLength({ min: 6, max: 6 })
  .withMessage('OTP must be 6 digits')
  .isNumeric()
  .withMessage('OTP must contain only numbers');

// Routes
router.post('/send-otp', phoneNumberValidation, sendOTP);
router.post('/verify-otp', [phoneNumberValidation, otpValidation], verifyOTP);
router.get('/me', auth, getCurrentUser);

// Test token generation endpoint (for development only)
router.post('/generate-test-token', (req, res) => {
  const { isAdmin = false } = req.body;
  const token = jwtService.generateToken({
    userId: '67e8e4b727d22530b9bc6a4b', // Test user ID
    isAdmin
  });
  res.json({ token });
});

export default router; 