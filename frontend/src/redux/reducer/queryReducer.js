export function queryReducer(state = {}, action) {
  switch (action.type) {
    case "updateQuery":
      state = { ...state, [action.payload.type]: action.payload.query };
      return state;
    default:
      return state;
  }
}
