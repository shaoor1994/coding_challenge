export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    thumbnail: string;
  };
  nat: string;
  phone: string;
  email: string;
  country: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface RootState {
  users: User[];
  selectedGender: string | undefined;
}
