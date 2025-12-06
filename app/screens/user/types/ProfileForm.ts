export type ProfileForm = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  secondLastName: string;
  gender: string;
  birthDate: string;
  phone: string;
  suburb: string;
  city: string;
  country: string;
};

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePersonalInfoRequest {
  name: string;
  lastName: string;
  secondLastName: string;
  gender: string;
  birthDate: string;
  phone: string;
  suburb: string;
  city: string;
  country: string;
}

export interface UpdateCVRequest {
  cvFile: string; // Base64 o URL del archivo
}
