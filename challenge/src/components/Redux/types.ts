// types.ts
export interface User {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    picture: {
      large: string;
      thumbnail:string
      // Add other picture properties if needed
    };
    nat: string;
    phone:string;
    email:string;
    country:string
    coordinates: Coordinates;
    // Add other user properties as needed
  }
 
  export interface Coordinates {
    latitude: string;
    longitude: string;
  }
  
  export interface RootState {
    users: User[];
    selectedGender: string | undefined;
    //selectedGender: string | null;
  }
  