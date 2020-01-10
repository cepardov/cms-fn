export class User {
  id: number;
  socialId: string;
  firstName: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  enabled: boolean;
  createAt: string;
  roles: string[] = [];
}
