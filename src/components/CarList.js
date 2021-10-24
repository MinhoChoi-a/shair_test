import React from "react";
import { connect } from "react-redux";

import { Box, Typography, Grid } from "@mui/material"

import CarList_Style from "./styles/CarList_Style"

import car1 from "../img/car_1.jpeg"

const CarList = (props) => {
  
  const classes = CarList_Style();
  
  const { vehicleList, searchTerm } = props

    if(vehicleList.length > 0) {
      return (
          <Box className={classes.root}>
          <Grid container>
            {vehicleList
                .filter((vehicle) => vehicle.Model_Name.toLowerCase().includes(searchTerm))
                .map(vehicle => (
                  <Grid item={true} xs={12} md={6} className={classes.vehicleCard} key={vehicle.Model_ID}>
                      <img className={classes.image} src={car1}/>
                      <Typography className={classes.typo}>
                            {vehicle.Make_Name} <strong>{vehicle.Model_Name}</strong>
                      </Typography>
                  </Grid> 
            ))}
          </Grid>
        </Box>
      
      )}
    
      console.log("return");
      return (
        <Box className={classes.noData}>
          <Typography>NO RESULTS</Typography>
        </Box>
      )   

}

const mapStateToProps = (state) => {
    return {
      vehicleList: state.searchResult      
    };
  };

export default connect(mapStateToProps)(CarList);