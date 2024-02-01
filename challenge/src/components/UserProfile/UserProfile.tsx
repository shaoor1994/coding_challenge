// UserProfile.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/types'; 

const UserProfile: React.FC = () => {
    const users = useSelector((state: RootState) => state.users);
  // Add other properties as needed
  const user = users[0]; // Assuming you are navigating from the listing

  return (
    <div className="user-profile">
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
      <div>
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
        <p>{`Nationality: ${user.nat}`}</p>
        {/* Additional details and bonus features go here */}
      </div>
    </div>
  );
};

export default UserProfile;
