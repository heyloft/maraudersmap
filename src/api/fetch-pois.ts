import genericFetch from "./utils/generic-fetch";

const fetchPois = () => {
  return genericFetch("pois");
};

export default fetchPois;
