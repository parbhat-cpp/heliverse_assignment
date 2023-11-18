export function paginationReducer(state = 1, action) {
  switch (action.type) {
    case "nextPage":
      state = action.payload;
      return state;
    case "prevPage":
      state = action.payload;
      return state;
    default:
      return state;
  }
}
