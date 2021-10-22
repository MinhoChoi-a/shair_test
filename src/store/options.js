import {
    updateVehicleType
} from './reducers/reducers'

const GET_OPTIONS = "GET_OPTIONS"
const UPDATE_TYPE = "UPDATE_TYPE"

export const getOptions = (options) => {
    return {
        type: GET_OPTIONS,
        options
    }
}

export const updateType = (vehicleType) => {
    return {
        type: UPDATE_TYPE,
        vehicleType
    }
}

const reducer = (state = {}, action) => {
    switch (action.type) {
      
      case GET_OPTIONS:          
        return {...action.options}

      case UPDATE_TYPE:
        return updateVehicleType(state, action.vehicleType)

      default:
        return state;
    }
  };
  
  export default reducer;