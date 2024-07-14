import crypto from 'crypto'

export const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
    return otp.toString();
};

