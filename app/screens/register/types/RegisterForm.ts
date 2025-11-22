export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
