export function teamReducer(state = [], action) {
  switch (action.type) {
    case "addUserToTeam":
      state = [...state, action.payload];
      return state;
    case "resetTeam":
      state = [];
      return state;
    default:
      return state;
  }
}
