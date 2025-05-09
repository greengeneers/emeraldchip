// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/users';

export const createUser = async ({ username, password }) => {
  return await fetchHandler(baseUrl, getPostOptions({ username, password }))
};

export const getAllUsers = async () => {
  return await fetchHandler(baseUrl);
};

export const getUser = async (id) => {
  return await fetchHandler(`${baseUrl}/${id}`);
}

export const updateUsername = async (id, { username, name, email, zip_code }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ username, name, email, zip_code }))
}
