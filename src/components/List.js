import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { initializeOptions, getType, fetchCarList } from "../store/utils/dataCreator";

import { Box, Paper, FormControl, Slider, Autocomplete, TextField, Button, Typography,ButtonUnstyled } from "@mui/material"
import { makeStyles } from "@mui/styles"

import PaperComp from "./PaperComp"
import CarList from "./CarList"
import logo from "../img/CarSHAiR-Logo.png"

const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center'
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
        maxWidth: "450px",
        minWidth: "350px",
        height: "400px",
        textAlign: "center",
        padding: 10
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
            height: "70px",
            width: "70px",
            bottom: 0,
            right: 0,
            marginBottom: '20px',
            marginRight: '10px',
            zIndex: 8,        
        "@media (min-width: 700px)": {
            top: 0,
            marginTop: '150px',
            marginRight: '100px'
        }
    },

    filterButton: {
        width: '100%',
        height: '100%'        
    },

    carList: {
        marginTop: '150px',        
        width: '80%',
    }
    
}));

const List = (props) => {

    const classes = useStyles();

    const { options, initializeOptions } = props
    
    const [filterPaper, setFilterPaper] = useState(true);

    useEffect(() => {
        initializeOptions()       
    }, []);

        return (
            <Box className={classes.root}>
                
                <Paper className={classes.top} style={{backgroundColor: 'black'}} elevation={3}>
                    <img src= {logo}/>
                </Paper>
                
                <Box className={classes.filterBox} style={{display: filterPaper? 'flex' : 'none'}} >
                        <Paper className={classes.filterPaper} elevation={3}>
                             {options.make? 
                                <PaperComp filterPaper={filterPaper} setFilterPaper={setFilterPaper}/> : 
                                <h3>Data loading...</h3> }
                        </Paper>                            
                </Box>

                <Box className={classes.carList}>
                    <CarList/>
                </Box>

                <Box className={classes.filterButtonBox}>
                    <Button className={classes.filterButton} variant="contained" 
                    onClick={() => setFilterPaper(!filterPaper)}>
                        FILTER
                    </Button>                
                </Box>
            
            </Box>
        )   
}

const mapStateToProps = (state) => {
    return {
      options: state.options
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initializeOptions:() => {
        dispatch(initializeOptions());
      }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(List);
  