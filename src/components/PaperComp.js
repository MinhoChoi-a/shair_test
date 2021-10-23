import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { initializeOptions, getType, fetchCarList } from "../store/utils/dataCreator";

import { Box, Paper, FormControl, Slider, Autocomplete, TextField, Button, Typography,ButtonUnstyled } from "@mui/material"
import { makeStyles } from "@mui/styles"

import CarList from "./CarList"
import logo from "../img/CarSHAiR-Logo.png"

const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      display: 'flex'
    },
    top: {
        width: '100%',
        height: "100px",
        position: "fixed",
        margin: 0,
        top: 0,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        padding: 10
    },
    filterBox: {
        position:'absolute',
        height:'100%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9,
        background: 'rgba(0, 0, 0, 0.5)'
    },
    label: {
        marginTop: 20
    },
    filterPaper: {
        display: 'grid',
        width: "100%",
        height: "100%",
        textAlign: "center"
    },
    filterTitle: {
        justifySelf: 'center',
        marginTop: 20
    },
    filterContent: {
        justifySelf: 'center'
    },
    sliderLabel: {
        margin:0,
        padding:0
    },
    sliderBox: {
        display: 'flex',     
        flexDirection: 'column',
        alignContent: 'center'   
    },

    filterButtonBox: {
        position: "fixed",
        top: 0,
        right: 0,
        marginTop: '150px',
        marginRight: '100px',
        height: "70px",
        width: "70px",
        zIndex: 8       
    },

    filterButton: {
        width: '100%',
        height: '100%'        
    },

    carList: {
        marginTop: '100px',
        padding: 50,        
        width: '100%'
    }
    
}));

const PaperComp = (props) => {

    const classes = useStyles();

    const { options, vehicleList, initializeOptions, getType, fetchCarList } = props
    
    const [filterYear, setFilterYear] = useState(2010);
    const [filterMake, setFilterMake] = useState(0);
    const [filterType, setFilterType] = useState("All");

    const updateTypeList = async (event) => {

        var index = event.target.attributes[3].nodeValue
        
        var id = options.makeId_list[index]

        await getType(id);
        setFilterMake(id);        
        setFilterType("All");
    }

    const searchVehicles = async (event) => {
        event.preventDefault();

        const option = {
            type: filterType,
            year: filterYear,
            make: filterMake
        }

        await fetchCarList(option)
        props.setFilterPaper(!props.filterPaper);
    }

    console.log(options)

        return (
            <Box className={classes.filterPaper}>
                            <Box className={classes.filterTitle}>
                                <Typography>
                                    Select options what you want
                                </Typography>  
                            </Box>
                                <Autocomplete className={classes.filterContent}
                                    onChange={updateTypeList}
                                    disablePortal
                                    id="combo-box"                                
                                    options={options.make}                                
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Maker" />}
                                />
                                <Autocomplete className={classes.filterContent}
                                    value={filterType}
                                    onChange={(event, newValue) => {
                                        setFilterType(newValue);
                                    }}
                                    disablePortal
                                    id="combo-box"                                
                                    options={options.type}                                
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Type" />}
                                />
                                <Box className={classes.filterContent}
                                sx={{ width: 300 }}>
                                <Typography className={classes.sliderLabel} id="input-slider" gutterBottom>
                                    Year: {filterYear}
                                </Typography>                            
                                <Slider className={classes.filterContent}
                                    defaultValue={2010}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="input-slider"
                                    min={options.year[0]}
                                    max={options.year[1]}
                                    sx={{ width: 300 }}
                                    onChange={(event, newValue) => {
                                      setFilterYear(newValue);}}
                                />
                                </Box>
                            <Button variant="contained"
                                    onClick={searchVehicles}>
                                Search
                            </Button>                        
            </Box>
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
        getType:(make) => {
        dispatch(getType(make));
      },
        fetchCarList:(option) => {
        dispatch(fetchCarList(option))
      }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(PaperComp);
  