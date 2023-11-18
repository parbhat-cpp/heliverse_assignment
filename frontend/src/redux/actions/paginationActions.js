export const nextPage = (currentPage) => async (dispatch) => {
  dispatch({ type: "nextPage", payload: currentPage + 1 });
};

export const prevPage = (currentPage) => (dispatch) => {
  dispatch({ type: "prevPage", payload: currentPage - 1 });
};
