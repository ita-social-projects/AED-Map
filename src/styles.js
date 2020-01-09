import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  pointCard: {
    background: "#fff",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "10px",
    "&:hover": {
      background: "#ccc",
      cursor: "pointer"
    }
  },
  titleStyle: {
    fontSize: "22px",
    lineHeight: "26px"
  },
  descStyle: {
    fontSize: "14px"
  },
  sidebarStyle: {
    flex: "3",
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
    flex: "9"
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

export default classes;
