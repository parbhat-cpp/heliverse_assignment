export const addUserToTeam = (id) => (dispatch) => {
  dispatch({ type: "addUserToTeam", payload: id });
};

export const resetTeam = () => (dispatch) => {
  dispatch({ type: "resetTeam", payload: [] });
};
