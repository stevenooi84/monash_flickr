export const FETCH_CAROUSEL_DATA = "FETCH_CAROUSEL_DATA";

export const fetchData = data => {
  return {
    type: FETCH_CAROUSEL_DATA,
    data
  };
};
