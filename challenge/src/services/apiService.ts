import axios from "axios";

import { Coordinates } from "../components/Redux/types";

const API_URL = "https://randomuser.me/api/";
export const fetchGoogleMapLink = async (
  coordinates: Coordinates
): Promise<string | null> => {
  try {
    const { latitude, longitude } = coordinates;
    const apiUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    console.log(apiUrl);
    return apiUrl;
  } catch (error) {
    console.error("Error fetching Google Map link:", error);
    return null;
  }
};

export const fetchData = async (page = 1, results = 10) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&results=${results}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const fetchCountryFlags = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v2/all");
    return response.data.reduce(
      (acc: { [key: string]: string }, country: any) => {
        acc[country.alpha2Code] = country.flag;
        return acc;
      },
      {}
    );
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const fetchCoordinates = async () => {
  try {
    const response = await fetch(`${API_URL}?/coordinates`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching coordinates");
  }
};
