import { makeStyles } from "@mui/styles";

const Home_Style = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  top: {
    width: "100%",
    height: "100%",
    position: "fixed",
    margin: 0,
    top: 0,    
  },
  title: {
    height: "100px",
    width: "100%",
    backgroundColor: "black",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    "@media (max-width: 700px)": {
        height: "50px"        
      },
  },
  image: {
    maxWidth: "400px",
  },
  filterBar: {
    width: "100%",
    zIndex: 7,
    display: "flex",
    background: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 20,
  },
  searchBar: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  filledInput: {
    height: 50,
    width: 300,
    border: "1px solid #4b4a4f",
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0,
  },

  filterButtonBox: {
    height: 50,
    margin: 0,
    marginLeft: 10,

    "@media (max-width: 700px)": {
      height: "70px",
      width: "70px",
      position: "fixed",
      bottom: 0,
      right: 0,
      marginBottom: "20px",
      marginRight: "10px",
      zIndex: 8,
    },
  },

  filterButton: {
    width: "100%",
    height: "100%",
  },
  selectedFilter: {
    fontSize: 20,
    "@media (max-width: 700px)": {
      fontSize: 14,
      margin: 0,
    },
  },

  filterBox: {
    position: "fixed",
    top: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
    background: "rgba(0, 0, 0, 0.5)",
  },
  filterPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "450px",
    minWidth: "300px",
    height: "400px",
    textAlign: "center",
    padding: 10,
  },

  carList: {
    marginTop: "250px",
    width: "80%",
  },
  snackbark: {
    width: "100%",
    alignSelf: "center",
  },
}));

export default Home_Style;
