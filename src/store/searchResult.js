//global sate for the search result

const GET_CAR_LIST = "GET_CAR_LIST";

export const getCarList = (carList) => {
  return {
    type: GET_CAR_LIST,
    carList,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CAR_LIST:
      return action.carList;

    default:
      return state;
  }
};

export default reducer;
