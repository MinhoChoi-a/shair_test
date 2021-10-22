import axios from "axios";

import {
    getCarList,
    removeFilter
} from "../searchResult"

import {
    getOptions,
    updateType
} from "../options"

const API_BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles"
const YEAR_RANGE = [2001, 2021]

export const fetchCarList = (option) => async (dispatch) => {
    
    let year = "";
    let type = "";
    let make = "";


    if(option.make === "All" && option.year === "All") {
        make = "/getmodelsformake/" + option.make
    }

    else {

        make = "/getmodelsformakeyear/make/"+option.make;
        
        year = "/modelyear/"+option.year;
        
        if(option.type !== "All") {
            type = "/vehicleType/"+option.type; 
        }
    }

    const API_URL = API_BASE_URL + make + year + type + "?format=json"
    
    console.log(API_URL);

    try {
        const { data } = await axios.get(API_URL)
        dispatch(getCarList([...data.Results]))
    } catch (error) {
        console.error(error);
    }
}

//I think we can just use the fetchCarList method for this case
//export const fetchCarList = (options) => async (dispatch) => {

export const initializeOptions = () => async (dispatch) => {

    console.log("check check");
    
    const make = await axios.get(API_BASE_URL+"/getallmakes?format=json");
    
    const type = await axios.get(API_BASE_URL+"/GetVehicleTypesForMake/ASTON MARTIN?format=json");
    
    const make_list = make.data.Results.map((obj) => {
        return obj.Make_Name;
    })
    
    const type_list = type.data.Results.map((obj) => {
        return obj.VehicleTypeName
    })

    const options = {
        make: make_list,
        year: YEAR_RANGE,
        type: ["All", ...type_list]
    }    

    return dispatch(getOptions(options))
}

export const getType = (make) => async (dispatch) => {

    const { data } = await axios.get(API_BASE_URL+"/GetVehicleTypesForMake/"+make+"?format=json")

    const type_list = data.Results.map((obj) => {
        return obj.VehicleTypeName
    })

    return dispatch(updateType(["All", ...type_list]))
}