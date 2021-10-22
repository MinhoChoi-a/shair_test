const GET_CAR_LIST = "GET_CAR_LIST"
const REMOVE_FILTER = "REMOVE_FILTER"

export const getCarList = (carList) => {
    return {
        type: GET_CAR_LIST,
        carList
    }
}

export const removeFilter = (carList) => {
    return {
        type: REMOVE_FILTER,
        carList
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
      
      case GET_CAR_LIST:          
        return action.carList

      case REMOVE_FILTER: 
        return action.carList
      
      default:
        return state;
    }
  };
  
  export default reducer;