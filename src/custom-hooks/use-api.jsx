import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

// Function to get data and check if the token is not null then send the headers

const GET = async path => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(path, { headers });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to post data with JWT token included in the request headers

const POST = async (path, data) => {
  const response = await axios.post(path, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Function to put data with JWT token included in the request headers

const PUT = async (path, data) => {
  const response = await axios.put(path, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Function to delete data with JWT token included in the request headers

const DELETE = async path => {
  const response = await axios.delete(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { GET, POST, PUT, DELETE };
