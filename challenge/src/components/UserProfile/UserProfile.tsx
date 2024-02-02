import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/types";

const UserProfile: React.FC = () => {
  const users = useSelector((state: RootState) => state.users);

  const user = users[0];

  return (
    <div className="user-profile">
      <img
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <div>
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
        <p>{`Nationality: ${user.nat}`}</p>
      </div>
    </div>
  );
};

export default UserProfile;
