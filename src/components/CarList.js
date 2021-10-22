import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles"
import { Box, FormControl, FilledInput, InputAdornment } from "@mui/material"

const useStyles = makeStyles(() => ({
    root: {
      height: "100vh",
      display: 'flex',
      justifyContent: 'center'
    },
    filterPaper: {
        width: "400px",
        height: "600px",
        padding: "30",
    }
}));

const CarList = (props) => {

    const [searchTerm, setSearchTerm] = useState("");

    const { vehicleList } = props

    const classes = useStyles();
    
    const handleSubmit = (event) => {
        event.preventDefault();
      };
    
    const handleChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value.toLowerCase())
      };
    
    console.log(props.vehicleList)
    if(props.vehicleList) {
    return (
    
    <Box>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth hiddenLabel>
                <FilledInput
                name="search"
                onChange={handleChange}
                classes={{ root: classes.filledInput, input: classes.input }}
                disableUnderline
                placeholder="Search"
                startAdornment={
                    <InputAdornment position="start">
                    </InputAdornment>
                }></FilledInput>
            </FormControl>
        </form>
        {vehicleList
            .filter((vehicle) => vehicle.Model_Name.toLowerCase().includes(searchTerm))
            .map((vehicle) => {
            return <h3>{vehicle.Model_Name}</h3>
        })}
    </Box>
    
    )}
    return <h3>loading vehicle</h3>
}

const mapStateToProps = (state) => {
    return {
      vehicleList: state.searchResult      
    };
  };

export default connect(mapStateToProps)(CarList);