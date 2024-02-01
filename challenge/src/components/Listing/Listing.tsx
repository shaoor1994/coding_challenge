// // Listing.tsx
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUsers, setSelectedGender } from '../../redux/actions';

// const Listing: React.FC = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.users);
//   const selectedGender = useSelector((state) => state.selectedGender);

//   useEffect(() => {
//     // Fetch users data and dispatch setUsers action
//     const fetchUsers = async () => {
//       // Assuming you are fetching user data asynchronously
//       const usersData = await fetchData(); // Replace with your actual data fetching logic
//       dispatch(setUsers(usersData));
//     };

//     fetchUsers();
//   }, [dispatch]);

//   const handleGenderChange = (event) => {
//     dispatch(setSelectedGender(event.target.value));
//   };

//   const filteredList = selectedGender
//     ? users.filter((user) => user.gender === selectedGender)
//     : users;

//   return (
//     <div>
//       <h1>User Listing</h1>
//       <label htmlFor="genderSelect">Filter by Gender:</label>
//       <select
//         id="genderSelect"
//         onChange={handleGenderChange}
//         value={selectedGender || ''}
//       >
//         <option value="">All</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>
//       <ul>
//         {filteredList.map((user, index) => (
//           <li key={index}>
//             <strong>Name:</strong> {`${user.name.title} ${user.name.first} ${user.name.last}`}
//             <br />
//             <strong>Gender:</strong> {user.gender}
//             {/* Add other user properties as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Listing;



// Listing.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, setSelectedGender } from '../Redux/actions';
import { fetchData,fetchCountryFlags,fetchGoogleMapLink } from '../../services/apiService';
import { RootState,User ,Coordinates} from '../Redux/types'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faVenusMars,faMars, faVenus,faEnvelope,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import '../Styles/Listing.css'

const Listing: React.FC = () => {
  const dispatch = useDispatch();
  //const users = useSelector((state) => state.users);
  const users = useSelector((state: RootState) => state.users);
  const selectedGender = useSelector((state: RootState) => state.selectedGender);
  //const selectedGender = useSelector((state) => state.selectedGender);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFlags, setCountryFlags] = useState<{ [key: string]: string }>({});
  const [googleMapLink, setGoogleMapLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await fetchData(currentPage);
        dispatch(setUsers(data) as any);
      } catch (error) {
        // Handle error
      }
    };

    fetchUsersData();
  }, [currentPage, dispatch]);


  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const flags = await fetchCountryFlags();
        setCountryFlags(flags);
      } catch (error) {
        // Handle error
      }
    };

    fetchFlags();
  }, []);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedGender(event.target.value) as any);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredList = selectedGender
    ? users.filter((user) => user.gender === selectedGender)
    : users;

  const filteredAndPaginatedList = filteredList.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  const handleLocationClick = async (coordinates?: Coordinates) => {
    if (!coordinates) {
      console.warn('Coordinates are not available.');
      return;
    }

    console.log('Clicked on location icon with coordinates:', coordinates);

    const link = await fetchGoogleMapLink(coordinates);
    setGoogleMapLink(link);
  };
return (
    <div className="container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(event) => handleSearchChange(event)}
        className="search-bar" // Add appropriate styles
      />

      {/* Gender Filter */}
      <select
        value={selectedGender} 
        onChange={(event) => handleGenderChange(event)}
        className="gender-filter" // Add appropriate styles
      >
         
        <option value="male">Male</option>
      <option value="female">Female</option>
      </select>

      {/* User List */}
      <ul className="user-list">
        {filteredAndPaginatedList.map((user: User, index: number) => (
          <li key={index} className="user-item">
            {/* <img src={user.picture.thumbnail} alt="User Thumbnail" className="user-thumbnail" /> */}
            {/* <img src={user.picture.large} alt="User Thumbnail" className="user-thumbnail" /> */}
            <div className="user-thumbnail-container">
            <img
              src={user.picture.large}
              alt="User Thumbnail"
              className="user-thumbnail"
            />
          </div>
            <div className="user-details">
              <strong></strong> {`Hi, My name is  ${user.name.title} ${user.name.first} ${user.name.last}`}
              <br />
              {/* <strong>Gender:</strong> */}
               {user.gender}
              {/* <strong>Gender:</strong>  */}
              {/* {user.gender === 'male' ? (
                <span className="gender-icon">
                  <FontAwesomeIcon icon={faVenusMars} />
                  {user.gender}
                </span>
              ) : (
                <span className="gender-icon">
                  <FontAwesomeIcon icon={faVenusMars} />
                  {user.gender}
                </span>
              )} */}
              <br/>
              {user.phone && (
                <div className="phone-icon">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  {user.phone}
                </div>
              )}

              
              {user.email && (
                <div className="email-icon">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  {user.email}
                </div>
              )}

{user.nat && countryFlags[user.nat] && (
        <div className="country-icon">
          <img
            src={countryFlags[user.nat]}
            alt={`${user.nat} Flag`}
            className="country-flag"
          />
          {user.nat}
        </div>
      )}
       {user.coordinates && (
        <div
          className="location-icon"
          onClick={() => handleLocationClick(user.coordinates)} // Add ! to assert non-null
          role="button"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </div>
      )}
               {googleMapLink && (
        <div className="google-map-link">
          <a href={googleMapLink} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </div>
      )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
      <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );


// return (
//     <div className="container mx-auto p-4">
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={(event) => handleSearchChange(event)}
//         className="border p-2 mb-4"
//       />

//       {/* Gender Filter */}
//       <select
//         value={selectedGender}
//         onChange={(event) => handleGenderChange(event)}
//         className="border p-2 mb-4"
//       >
//         <option value="">All Genders</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>

//       {/* User List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {filteredAndPaginatedList.map((user, index) => (
//           <div key={index} className="border p-4 rounded-lg shadow-md flex flex-col items-center">
//             <div className="mb-4 object-cover rounded-full border border-gray-300">
//               <img
//                 src={user.picture.large}
//                 alt="User Thumbnail"
//                 className="w-16 h-16 object-cover rounded-full border border-gray-300"
//               />
//             </div>
//             <div className="text-lg font-semibold mb-2">
//               {`${user.name.title} ${user.name.first} ${user.name.last}`}
//             </div>
//             <div className="flex items-center text-gray-600">
//               {user.gender === 'male' ? (
//                 <span className="mr-2">
//                   <i className="fas fa-mars"></i>
//                 </span>
//               ) : (
//                 <span className="mr-2">
//                   <i className="fas fa-venus"></i>
//                 </span>
//               )}
//               {user.phone && (
//                 <span className="mr-2">
//                   <i className="fas fa-phone"></i> {user.phone}
//                 </span>
//               )}
//               {user.nat && (
//                 <span>
//                   <img
//                     src={`https://restcountries.com/v3/alpha/${user.nat.toLowerCase()}.png`}
//                     alt="National Flag"
//                     className="w-4 h-4 inline-block"
//                   />
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-4">
//         {/* Buttons for pagination... */}
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//         >
//           Previous
//         </button>
//         <span>{currentPage}</span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );



};

export default Listing;

