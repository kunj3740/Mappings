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
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AddressInput {
    label: string;
    street: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
  }
  
  