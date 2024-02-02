import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, setSelectedGender } from "../Redux/actions";
import {
  fetchData,
  fetchCountryFlags,
  fetchGoogleMapLink,
  fetchCoordinates,
} from "../../services/apiService";
import { RootState, User, Coordinates } from "../Redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faVenusMars,
  faMars,
  faVenus,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import "../Styles/Listing.css";

const Listing: React.FC = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users);
  const selectedGender = useSelector(
    (state: RootState) => state.selectedGender
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFlags, setCountryFlags] = useState<{ [key: string]: string }>(
    {}
  );
  const [googleMapLink, setGoogleMapLink] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await fetchData(currentPage);
        dispatch(setUsers(data) as any);
        setFilteredUsers(data);
      } catch (error) {
        setError("Error fetching user data");
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
        setError("Error fetching user data");
      }
    };

    fetchFlags();
  }, []);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    dispatch(setSelectedGender(event.target.value) as any);
    if (selectedValue === "all") {
      setFilteredUsers(users);
    } else {
      const filteredUsers = users.filter(
        (user) => user.gender === selectedValue
      );
      setFilteredUsers(filteredUsers);
    }

    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredUsers = users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(searchTerm) ||
        user.name.last.toLowerCase().includes(searchTerm)
    );

    setFilteredUsers(filteredUsers);
    setCurrentPage(1); // Reset current page when search term changes
  };

  const filteredAndPaginatedList = filteredUsers.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleLocationClick: React.MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    if (!coordinates) {
      console.warn("Coordinates are not available.");
      return;
    }

    console.log("Clicked on location icon with coordinates:", coordinates);

    const link = await fetchGoogleMapLink(coordinates);
    setGoogleMapLink(link);
  };

  useEffect(() => {
    const fetchInitialCoordinates = async () => {
      try {
        const initialCoordinates = await fetchCoordinates();
        setCoordinates(initialCoordinates);
      } catch (error) {
        setError("Error fetching initial coordinates");
      }
    };

    fetchInitialCoordinates();
  }, []);

  return (
    <div className="container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(event) => handleSearchChange(event)}
        className="search-bar"
      />

      {/* Gender Filter */}
      <select
        value={selectedGender}
        onChange={(event) => handleGenderChange(event)}
        className="gender-filter"
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* User List */}
      <ul className="user-list">
        {filteredAndPaginatedList.map((user: User, index: number) => (
          <li key={index} className="user-item">
            <div className="user-thumbnail-container">
              <img
                src={user.picture.large}
                alt="User Thumbnail"
                className="user-thumbnail"
              />
            </div>
            <div className="user-details">
              <strong></strong>{" "}
              {`Hi, My name is  ${user.name.title} ${user.name.first} ${user.name.last}`}
              <br />
              {user.gender}
              <br />
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
              {coordinates && (
                <div className="location-icon-container">
                  <div
                    className="location-icon"
                    onClick={handleLocationClick}
                    role="button"
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="view-on-maps-text">View Location on Maps</div>
                </div>
              )}
              {googleMapLink && (
                <div className="google-map-link">
                  <a
                    href={googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>Navigate to Location</strong>
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
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-text">
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="footer">
        Developed by Saad Shaoor Ghazanfar. All rights reserved.
      </div>
    </div>
  );
};

export default Listing;
