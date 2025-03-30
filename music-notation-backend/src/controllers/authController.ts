import { Request, Response } from 'express';
import { User } from '../models/User';
import { jwtService } from '../services/jwtService';
import { validationResult } from 'express-validator';

// Fixed OTP for all users
const DEFAULT_OTP = '123456';

export const sendOTP = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { phoneNumber } = req.body;
    console.log('Received request to send OTP to:', phoneNumber);

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // For testing, just return success
    console.log('Sending OTP response');
    return res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in sendOTP:', error);
    return res.status(500).json({ message: 'Error sending OTP' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }
    if (otp !== DEFAULT_OTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = await User.create({
        phoneNumber,
        name: `User ${phoneNumber.slice(-4)}`,
        isAdmin: false
      });
    }
    const token = jwtService.generateToken({
      userId: user._id.toString(),
      isAdmin: user.isAdmin
    });
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying OTP' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user' });
  }
}; 