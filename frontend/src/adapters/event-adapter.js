import { fetchHandler } from "../utils/fetchingUtils";

const baseUrl = '/api/events';

export const listEvents = async (yearMonth) => {
  return await fetchHandler(`${baseUrl}/${yearMonth}`);
};

export const showEventById = async (id) => {
  return await fetchHandler(`${baseUrl}/${id}`);
};
