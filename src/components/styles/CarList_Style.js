import { makeStyles } from "@mui/styles";

const CarList_Style = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleCard: {
    padding: 10,
  },

  typo: {
    background: "#d6d6d6",
    padding: 10,
  },

  image: {
    width: "100%",
  },

  noData: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  loading: {
    width: "100%",
  },

  circular: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

export default CarList_Style;
