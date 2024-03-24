import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
  console.log(roles)
  return SetMetadata(ROLES_KEY, roles)
};