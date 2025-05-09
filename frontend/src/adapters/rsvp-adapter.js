import {
  fetchHandler,
  postOptions,
  deleteOptions,
} from "../utils/fetchingUtils";

const baseUrl = '/api/rsvp';

export const listRsvp = async () => {
  return await fetchHandler(baseUrl);
};

export const addRsvp = async (eventId) => {
  return await fetchHandler(`${baseUrl}/${eventId}`, postOptions);
};

export const removeRsvp = async (eventId) => {
  return await fetchHandler(`${baseUrl}/${eventId}`, deleteOptions);
};
