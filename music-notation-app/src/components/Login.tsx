import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  useTheme,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { authService } from '../services/api';
import { User } from '../types/song';
import { MusicNote as MusicNoteIcon } from '@mui/icons-material';

interface LoginProps {
  onLoginSuccess: (userData: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounced countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSendOTP = useCallback(async () => {
    if (isSubmitting || loading) return;
    
    try {
      setIsSubmitting(true);
      setLoading(true);
      setError('');
      setSuccess('');
      console.log('Sending OTP to:', phoneNumber);
      const response = await authService.sendOTP(phoneNumber);
      console.log('OTP sent response:', response);
      setOtpSent(true);
      setSuccess('OTP sent successfully! Please check your phone.');
      setCountdown(30); // 30 seconds countdown
    } catch (err: any) {
      console.error('Error sending OTP:', err);
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map((e: any) => e.msg).join(', ');
        setError(errorMessages);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  }, [phoneNumber, isSubmitting, loading]);

  const handleVerifyOTP = useCallback(async () => {
    if (isSubmitting || loading) return;
    
    try {
      setIsSubmitting(true);
      setLoading(true);
      setError('');
      console.log('Verifying OTP:', { phoneNumber, otp });
      const response = await authService.verifyOTP(phoneNumber, otp);
      console.log('OTP verification response:', response);
      if (response.user) {
        onLoginSuccess(response.user);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  }, [phoneNumber, otp, isSubmitting, loading, onLoginSuccess]);

  const handleResendOTP = useCallback(() => {
    if (countdown > 0 || isSubmitting) return;
    setOtpSent(false);
    setOtp('');
    setError('');
    setSuccess('');
  }, [countdown, isSubmitting]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      handleSendOTP();
    } else {
      handleVerifyOTP();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Welcome Message */}
          <Grid item xs={12} md={6}>
            <Box sx={{ color: 'white', mb: { xs: 4, md: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <MusicNoteIcon sx={{ fontSize: 48, mr: 2 }} />
                <Typography variant="h3" component="h1" gutterBottom>
                  Digital Music Notes
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
                Your digital music notation platform
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
                Create, edit, and share your musical compositions with ease. 
                Access your music sheets from anywhere, anytime.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  label="Western Notation"
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <Chip
                  label="Carnatic Music"
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <Chip
                  label="Hindustani Music"
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right side - Login Form */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.95)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                  Sign in to continue to your music sheets
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  {!otpSent ? (
                    <>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="tel"
                        autoFocus
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        inputProps={{ maxLength: 10 }}
                        helperText="Enter 10-digit phone number"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || phoneNumber.length !== 10 || isSubmitting}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Send OTP'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="otp"
                        label="Enter OTP"
                        name="otp"
                        autoComplete="off"
                        autoFocus
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        inputProps={{ maxLength: 6 }}
                        helperText="Enter 6-digit OTP (Default: 123456)"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || otp.length !== 6 || isSubmitting}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
                      </Button>
                      <Button
                        type="button"
                        fullWidth
                        variant="text"
                        onClick={handleResendOTP}
                        disabled={loading || countdown > 0 || isSubmitting}
                      >
                        {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                      </Button>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 