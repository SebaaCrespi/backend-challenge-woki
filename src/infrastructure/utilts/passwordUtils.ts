import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
}

export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hash);
  return isMatch;
}