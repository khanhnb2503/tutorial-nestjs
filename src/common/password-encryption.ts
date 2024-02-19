import * as bcryptjs from 'bcryptjs';

export const passwordEnCryption = (password: string): string => {
  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(password, salt);
  return hashPassword;
}

export const comparePassword = (password: string, hashPassword: string): boolean => {
  return bcryptjs.compareSync(password, hashPassword)
}