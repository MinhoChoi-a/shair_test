import { makeStyles } from "@mui/styles"

const Filter_Style = makeStyles(() => ({
    
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
   
}));

export default Filter_Style