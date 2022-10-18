import genericFetch from "./utils/generic-fetch";

const fetchEvents = () => {
  return genericFetch(`events/`);
};

export default fetchEvents;
