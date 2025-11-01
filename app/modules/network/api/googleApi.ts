import axios from "axios";

export const googleApiLocations = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode",
});
