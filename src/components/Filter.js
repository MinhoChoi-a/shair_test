import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getType, fetchCarList } from "../store/utils/dataCreator";

import {
  Box,
  Slider,
  Autocomplete,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import Filter_Style from "./styles/Filter_Style";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Filter = (props) => {
  const classes = Filter_Style();

  const { options, getType, fetchCarList, setFilterOption } = props;

  const [filterYear, setFilterYear] = useState(2010);
  const [filterMake, setFilterMake] = useState(0);
  const [filterType, setFilterType] = useState("All");

  const [open, setOpen] = useState(false);
  const [option, setOption] = useState([]);
  const loading = open && option.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOption([...options.make]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOption([]);
    }
  }, [open]);

  const updateTypeList = async (event) => {
    var index = event.target.attributes[3].nodeValue;

    if (index !== "text") {
      var id = options.makeId_list[index];

      await getType(id);
      setFilterMake(id);
      setFilterType("All");
    }
  };

  const searchVehicles = async (event) => {
    event.preventDefault();

    if (filterMake == 0) {
      props.setErrorMessage("Please select the Maker");
      props.openAlert();
    } else {
      const option = {
        type: filterType,
        year: filterYear,
        make: filterMake,
      };

      await fetchCarList(option);
      document.body.style.overflow = "auto";

      if (filterType === "Multipurpose Passenger Vehicle (MPV)") {
        option.type = "MPV";
      }

      setFilterOption(option);
      props.setFilterPaper(!props.filterPaper);
    }
  };

  return (
    <Box className={classes.filterPaper}>
      <Box className={classes.filterTitle}>
        <Typography>Select options what you want</Typography>
      </Box>
      <Autocomplete
        className={classes.filterContent}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        onInputChange={updateTypeList}
        disablePortal
        id="combo-box"
        options={option}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Maker"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Box>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Box>
              ),
            }}
          />
        )}
      />
      <Autocomplete
        className={classes.filterContent}
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
      <Box className={classes.filterContent} sx={{ width: 300 }}>
        <Typography
          className={classes.sliderLabel}
          id="input-slider"
          gutterBottom
        >
          Year: {filterYear}
        </Typography>
        <Slider
          className={classes.filterContent}
          defaultValue={2010}
          valueLabelDisplay="auto"
          aria-labelledby="input-slider"
          min={options.year[0]}
          max={options.year[1]}
          sx={{ width: 300 }}
          onChange={(event, newValue) => {
            setFilterYear(newValue);
          }}
        />
      </Box>
      <Button variant="contained" onClick={searchVehicles}>
        Search
      </Button>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
    vehicleList: state.searchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getType: (make) => {
      dispatch(getType(make));
    },
    fetchCarList: (option) => {
      dispatch(fetchCarList(option));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
