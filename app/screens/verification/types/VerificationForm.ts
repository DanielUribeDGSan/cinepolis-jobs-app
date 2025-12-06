export type VerificationForm = {
  code: string;
};

export interface VerificationRequest {
  code: string;
  email: string;
}
