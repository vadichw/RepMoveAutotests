export interface NewUserModel {
  result: NewUserResponse;
}

export interface NewUserResponse {
  id: string;
  userId: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
  updatedById: string;
  type: number;
  reportToId: string | null;
  email: string;
  displayName: string;
  companyName: string;
  industry: string;
  phoneNumber: string;
  phoneCountry: string;
  photoURL: string | null;
  disabled: boolean;
}

