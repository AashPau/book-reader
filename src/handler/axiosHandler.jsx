import axios from "axios";
const apiUrl = "https://openlibrary.org/search.json?title=";

export const fetchFromAPI = async (bookName) => {
  const response = await axios.get(apiUrl + bookName);
  // console.log(response);
  return response.data;
};
