export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddressType = 'home' | 'office' | 'friends';

export interface LocationPermissionState {
  granted: boolean;
  denied: boolean;
  requesting: boolean;
}