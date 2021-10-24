export const updateVehicleType = (state, vehicleType) => {
  return { ...state, type: [...vehicleType] };
};
