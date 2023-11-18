export function usersReducer(state = [], action) {
  switch (action.type) {
    case "setUsersData":
      state = action.payload;
      return state;
    default:
      return state;
  }
}
