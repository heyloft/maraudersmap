import genericFetch from "./utils/generic-fetch";

const fetchItems = () => {
  return genericFetch("items");
};

export default fetchItems;
