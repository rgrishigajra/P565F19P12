import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import {
  Route,
  Link,
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
import logo from "../img/logo2.png";
import { useCookies, setCookie, withCookies } from "react-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function MyNavBarRecruiter(props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userEmail",
    "userId",
    "isActive",
    "isRecruiter"
  ]);

  const classes = useStyles();
  const logOut = () => {
    console.log("Logging out and removing cookies");
    console.log(cookies["userEmail"]);
    console.log(cookies["userId"]);
    console.log(cookies["isNotActive"]);
    console.log(cookies["isRecruiter"]);
    setCookie("isNotActive", false, { path: "/" });
    setCookie("userEmail", false, { path: "/" });
    setCookie("userId", undefined, { path: "/" });
    setCookie("isRecruiter", false, { path: "/" });
    console.log(cookies["userEmail"]);
    console.log(cookies["userId"]);
    console.log(cookies["isNotActive"]);
    console.log(cookies["isRecruiter"]);
    pushToLogin();
  };
  const pushToLogin = () => {
    props.history.push("/");
  };
  const switchToUser = () => {
    props.history.push("/home");
  };
  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = () => {
    if (cookies["isNotActive"] == false) {
      pushToLogin();
    }
  };
  return (
    <div data-spy="scroll" data-target=".navbar" data-offset="50">
      <nav
        className="navbar navbar-expand-sm fixed-top navnav"
        style={{ backgroundColor: "white" }}
      >
        <div style={{ backgroundColor: "#e7717d", width: "100%" }}>
          <img
            src={logo}
            alt="mylogo"
            style={{ width: "6%", marginLeft: "2.5%" }}
          />
          <Button
            className={classes.menuButton}
            onClick={logOut}
            style={{
              float: "right",
              // backgroundColor: "#AFD275",
              color: "#AFD275",
              marginTop: "1.2%",
              borderRadius:"20vh",
            }}
          >
            <strong>Log Out</strong>
          </Button>
          <Tooltip title="Switch to User Profile">
          <Button
            className={classes.menuButton}
            onClick={switchToUser}
            style={{
              float: "right",
              // backgroundColor: "#AFD275",
              color: "#AFD275",
              marginTop: "1.2%",
              borderRadius:"20vh",
            }}
          >
            <CompareArrowsIcon/>
          </Button>
          </Tooltip>
        </div>
      </nav>
    </div>
  );
}
export default withCookies(withRouter(MyNavBarRecruiter));
