import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles"
import { Box, FormControl, FilledInput, InputAdornment, Slider, Card, CardContent, Typography, CardMedia, Grid } from "@mui/material"
import { Search } from "@mui/icons-material";

import logo from "../img/CarSHAiR-Logo.png"
import car1 from "../img/car_1.jpeg"

const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'      
    },

    filledInput: {
      height: 50,
      width: 300,
      borderRadius: 5,
      fontSize: 15,
      fontWeight: "bold",
      letterSpacing: 0,
      marginBottom: 20,      
    },
    
    vehicleCard: {
      padding: 10
    },

    typo: {
      background: "#E9EEF9",
    },

    image: {
      width: "100%"
    },
    
    
}));

const CarList = (props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const { vehicleList } = props

    const classes = useStyles();
    
    const handleChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value.toLowerCase())
      };
    
    console.log(props.vehicleList)
    
    if(props.vehicleList) {
      return (
          <Box className={classes.root}>
            
            <FilledInput
                  classes={{ root: classes.filledInput }}
                  name="search"
                  onChange={handleChange}
                  disableUnderline
                  placeholder="Search by Model Name"
                  startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                  }>
            </FilledInput>
          
          <Grid container spacing={2}>
            {vehicleList
                .filter((vehicle) => vehicle.Model_Name.toLowerCase().includes(searchTerm))
                .map(vehicle => (
                  <Grid xs={12} md={6} className={classes.vehicleCard}>
                      <img className={classes.image} src={car1}/>
                      <Typography className={classes.typo}>
                            {vehicle.Make_Name} <strong>{vehicle.Model_Name}</strong>
                      </Typography>
                  </Grid> 
            ))}
          </Grid>
        </Box>
      
      )}    
}

const mapStateToProps = (state) => {
    return {
      vehicleList: state.searchResult      
    };
  };

export default connect(mapStateToProps)(CarList);