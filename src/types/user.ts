export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  username?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  website?: string;
}

export interface NewUserFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}
