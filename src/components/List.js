import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { initializeOptions, getType, fetchCarList } from "../store/utils/dataCreator";

import { Box, Paper, FormControl, Slider, Autocomplete, TextField, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"

import CarList from "./CarList"

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

const List = (props) => {

    const classes = useStyles();

    const { options, vehicleList, initializeOptions, getType, fetchCarList } = props
    
    const [filterYear, setFilterYear] = useState(2010);
    const [filterMake, setFilterMake] = useState("ASTON MARTIN");
    const [filterType, setFilterType] = useState("All");

    const [filterPaper, setFilterPaper] = useState(true);

    useEffect(() => {
        initializeOptions()       
    }, []);

    const updateTypeList = async (event) => {
        
        await getType(event.target.textContent);
        setFilterMake(event.target.textContent);        
     
    }

    const searchVehicles = async (event) => {
        event.preventDefault();

        const option = {
            type: filterType,
            year: filterYear,
            make: filterMake
        }

        await fetchCarList(option)
        setFilterPaper(!filterPaper);
    }

    console.log(options);
    console.log(vehicleList);

    if(options.make) {
    
        return (
            <Box className={classes.root}>
                
                <Paper className={classes.filterPaper} style={{display: filterPaper? 'block' : 'none'}} elevation={3}>
                        <Box width={300} style={{padding:30}}>
                                <Slider
                                    aria-label="Default"
                                    defaultValue={2010}
                                    valueLabelDisplay="auto"
                                    min={options.year[0]}
                                    max={options.year[1]}
                                    onChange={(event, newValue) => {
                                        setFilterYear(newValue);
                                    }}
                                />
                            </Box>
                            <Box>
                                <Autocomplete
                                    value={filterMake}
                                    onChange={updateTypeList}
                                    disablePortal
                                    id="combo-box-demo"                                
                                    options={options.make}                                
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Maker" />}
                                />
                            </Box>
                            <Box>
                                <Autocomplete
                                    value={filterType}
                                    onChange={(event, newValue) => {
                                        setFilterType(newValue);
                                    }}
                                    disablePortal
                                    id="combo-box-demo"                                
                                    options={options.type}                                
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Type" />}
                                />
                            </Box>
                            <Button variant="contained" color="success"
                                    onClick={searchVehicles}
                            >
                                Search
                            </Button>
                </Paper>
                <Button variant="contained" color="success"
                    onClick={() => setFilterPaper(!filterPaper)}
                >
                FILTER
                </Button>
                <CarList/>
            </Box>
            
        )
    }

    return (
    
    <h3>loading</h3>
    
    )
    
}

const mapStateToProps = (state) => {
    return {
      options: state.options,
      vehicleList: state.searchResult
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initializeOptions:() => {
        dispatch(initializeOptions());
      },
        getType:(make) => {
        dispatch(getType(make));
      },
        fetchCarList:(option) => {
        dispatch(fetchCarList(option))
      }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(List);
  