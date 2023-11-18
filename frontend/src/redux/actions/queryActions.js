export const updateQuery = (query, type) => (dispatch) => {
  dispatch({ type: "updateQuery", payload: { query, type } });
};
