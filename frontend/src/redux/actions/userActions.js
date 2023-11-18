export const setUsersData = (data) => (dispatch) => {
  dispatch({ type: "setUsersData", payload: data });
};
