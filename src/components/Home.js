import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { initializeOptions } from "../store/utils/dataCreator";

import { Box, Paper, Button, Snackbar, Alert, Input, Typography, FilledInput, InputAdornment, Container } from "@mui/material"
import { Search } from "@mui/icons-material";

import Home_Style from "./styles/Home_Style";

import Filter from "./Filter"
import CarList from "./CarList"
import logo from "../img/CarSHAiR-Logo.png"

const List = (props) => {

    const classes = Home_Style();

    const { options, initializeOptions, searchResult } = props
    
    const [filterPaper, setFilterPaper] = useState(true);
    const [filterOption, setFilterOption] = useState({});

    const [alertOpen, setAlertOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    
    
    const handleChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value.toLowerCase())
      };

    useEffect(() => {
        initializeOptions()       
    }, []);

    const handleFilterPaper = () => {
        document.body.style.overflow = 'hidden';
        setFilterPaper(!filterPaper)
    }

    const openAlert = () => {
        setAlertOpen(true);
    };  

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        setAlertOpen(false);
        return;
        }
    };

    console.log(searchResult);

        return (
            <Box className={classes.root}>

                <Box className={classes.top}>
                    <Box className={classes.title}>
                        <img src= {logo}/>
                    </Box>
                    <Box className={classes.filterBar}>
                        <Box className={classes.searchBar}>
                            <Input
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
                            </Input>
                            <Box className={classes.filterButtonBox}>
                                <Button className={classes.filterButton} variant="contained" 
                                onClick={() => handleFilterPaper()}>
                                    FILTER
                                </Button>                
                            </Box>
                        </Box>
                        {searchResult.length>0?
                        <p className={classes.selectedFilter}>
                            MAKER <strong>{searchResult[0].Make_Name}</strong> / YEAR <strong>{filterOption.year}</strong> / TYPE <strong>{filterOption.type}</strong>
                        </p>:
                        <Typography></Typography>
                        }
                        
                    </Box>
                </Box>
                
                <Box className={classes.filterBox} style={{display: filterPaper? 'flex' : 'none'}} >
                        <Paper className={classes.filterPaper} elevation={3}>
                             {options.make? 
                                <Filter filterPaper={filterPaper} setFilterOption={setFilterOption} setFilterPaper={setFilterPaper} openAlert={openAlert} setErrorMessage={setErrorMessage}/> : 
                                <h3>Data loading...</h3> }
                        </Paper>                            
                </Box>

                
                <Box className={classes.carList}>
                    <CarList searchTerm={searchTerm}/>
                </Box>
                                
                <Snackbar className={classes.snakbar} open={alertOpen} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>

            </Box>
        )   
}

const mapStateToProps = (state) => {
    return {
      options: state.options,
      searchResult: state.searchResult
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
  