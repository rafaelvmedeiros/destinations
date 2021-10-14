import api from "../services/api";

export const getContracts = async () => {
  try {
    const response = await api.get("/contracts");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getDestinations = async () => {
  try {
    const response = await api.get("/destinations");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
