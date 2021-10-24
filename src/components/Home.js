import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { initializeOptions } from "../store/utils/dataCreator";

import {
  Box,
  Paper,
  Button,
  Snackbar,
  Alert,
  Input,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import Home_Style from "./styles/Home_Style";

import Filter from "./Filter";
import CarList from "./CarList";
import logo from "../img/CarSHAiR-Logo.png";

const List = (props) => {
  const classes = Home_Style();

  const { options, initializeOptions, searchResult } = props;

  const [filterPaper, setFilterPaper] = useState(true);
  const [filterOption, setFilterOption] = useState({});

  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    initializeOptions();
  }, [initializeOptions]);

  const handleFilterPaper = () => {
    document.body.style.overflow = "hidden";
    setFilterPaper(!filterPaper);
  };

  const openAlert = () => {
    setAlertOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setAlertOpen(false);
      return;
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.top}>
        <Box className={classes.title}>
          <img className={classes.image} src={logo} alt="logo_image" />
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
              }
            ></Input>
            <Box className={classes.filterButtonBox}>
              <Button
                className={classes.filterButton}
                variant="contained"
                onClick={() => handleFilterPaper()}
              >
                FILTER
              </Button>
            </Box>
          </Box>
          {(searchResult && searchResult.length) > 0 ? (
            <Box className={classes.selectedFilterBox}>
              <Box>
                <Typography className={classes.selectedFilter}>
                  MAKER <strong>{(searchResult[0].Make_Name.length > 13) ? 
                    searchResult[0].Make_Name.substring(0,11)+"..." 
                    :searchResult[0].Make_Name}</strong> / YEAR{" "}
                  <strong>{filterOption.year}</strong> /{" "}
                </Typography>
              </Box>
              <Box className={classes.selectedFilterRight}>
                <Typography className={classes.selectedFilter}>
                   TYPE <strong>{filterOption.type}</strong>
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography></Typography>
          )}
        </Box>
      </Box>

      <Box
        className={classes.filterBox}
        style={{ display: filterPaper ? "flex" : "none" }}
      >
        <Paper className={classes.filterPaper} elevation={3}>
          {options.make ? (
            <Filter
              filterPaper={filterPaper}
              setFilterOption={setFilterOption}
              setFilterPaper={setFilterPaper}
              openAlert={openAlert}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <Box className={classes.loding}>
              <h3>loading...</h3>
              <Box className={classes.circular}>
                <CircularProgress color="inherit" size={40} />
              </Box>
            </Box>
          )}
        </Paper>
      </Box>

      <Box className={classes.carList}>
        <CarList searchTerm={searchTerm} />
      </Box>

      <Snackbar
        className={classes.snakbar}
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
    searchResult: state.searchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeOptions: () => {
      dispatch(initializeOptions());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
