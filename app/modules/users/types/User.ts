export interface Roles {
  idParty: string;
  idPartyRole: string;
  idPartyRoleType: number;
  nameRole: string;
  thruDate: string;
}

export interface User {
  idParty: string;
  token: string;
  name: string;
  lastName: string;
  secondLastName: string;
  userName: string;
  gender: string;
  areaInterest: string;
  phone: string;
  country: string;
  city: string;
  suburb: string;
  postalCode: string;
  idPartyRoleType: number;
  nameRole: string;
  roles: Roles[];
}
