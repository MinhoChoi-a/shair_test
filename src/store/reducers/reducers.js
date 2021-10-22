//add type to the options state

export const updateVehicleType = (state, vehicleType) => {
    
    console.log("reducer check");

    return {...state, type: [...vehicleType]}

}