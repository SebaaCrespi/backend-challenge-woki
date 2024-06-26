import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'a9ca47a80ecfa2ab558296eeecd9ec22126075fedd446938075b785994500d7e';

export const generateJWT = (userId: string) => {
  const payload = {
    userId,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};