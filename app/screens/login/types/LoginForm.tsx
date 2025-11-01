export type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export interface LoginRequest {
  userName: string;
  password: string;
}
