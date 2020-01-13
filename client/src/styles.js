import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  pointCard: {
    background: "#fff",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "10px",
    display: "flex",
    "&:hover": {
      background: "#ccc",
      cursor: "pointer"
    }
  },
  pointCardInfo:{
    flex: "5"
  },
  eventButtons:{
    flex: "1",
  },
  editItem:{
    border: "2px solid #000",
    borderRadius: "50%",
    backgroundColor: "#fff",
    padding: "2px",
    opacity: ".7",
    margin: "2px 10px",
    transform: "scale(0.8)",
    cursor: "pointer"
  },
  deleteItem:{
    border: "2px solid #000",
    borderRadius: "50%",
    backgroundColor: "#fff",
    padding: "2px",
    opacity: ".7",
    margin: "2px 10px",
    transform: "scale(0.8)",
    cursor: "pointer"
  },
  titleStyle: {
    fontSize: "22px",
    lineHeight: "26px"
  },
  descStyle: {
    fontSize: "14px"
  },
  sidebarStyle: {
    flex: "2",
    padding: "20px"
  },
  coordsStyle: {
    display: "block",
    position: "absolute",
    top: "0",
    left: "0",
    margin: "12px",
    backgroundColor: "#3c3c3c",
    color: "#ffffff",
    zIndex: "1",
    padding: "7px",
    fontWeight: "bold"
  },

  mapStyle: {
    position: "absolute",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "100%"
  },

  mapOuterStyle: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    flex: "10"
  },
  mainStyle: {
    display: "flex",
    width: "100%"
  },
  addForm:{
    color: "#fff"
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

export default classes;
