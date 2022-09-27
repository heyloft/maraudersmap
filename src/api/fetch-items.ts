import genericFetch from "./utils/generc-fetch";

const fetchItems = () => {
  return genericFetch("items");
};

export default fetchItems;
