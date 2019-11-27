import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Box, Modal, Fade } from "@material-ui/core";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanyPage from "../CompanyPage";
import Backdrop from "@material-ui/core/Backdrop";
import images from '../../img/images'
const useStyles = makeStyles(theme=>({
  card: {
    display: "flex",
    marginBottom: "5%",
    marginRight: "5%",
    background: "#F4F4F4",
    borderRadius: "4%"
  },
  media: {
    height: "15%",
    width: "15%"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
}));

export default function ExpandedJob(props) {
  const [cookies, setCookie] = useCookies(["userId"]);
  const [moreDetials, setMoreDetails] = useState(false);
  const classes = useStyles();
  const applyJob = event => {
    const user = {
      userId: parseInt(cookies["userId"]),
      jobId: props.jobId
    };
    console.log(user);
    axios.post("/applyJob", { user }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };
  const imageClick = () => {
    console.log(props.companyName);
    handleOpenCompany()
  } 
  const [openComp, setOpenComp] = React.useState(false);

  const handleOpenCompany = () => {
    setOpenComp(true);
  };

  const handleCloseCompany = () => {
    setOpenComp(false);
  };
  console.log(images.find(x=>x.id==props.companyName).src)
  return (
    <Card className={classes.card}>
      <CardContent>
        <Row>
          <Col xs="auto">
            <img
              style={{ width: "15vh", cursor: "pointer" }}
              onClick={() => imageClick()}
              src={images.find(x=>x.id==props.companyName).src}
            />
          </Col>
          <Col>
            <h3 style={{ marginTop: "4vh" }}>{props.jobName}</h3>
            <p style={{ color: "grey" }}>
              <LocationOnIcon /> {props.city},{props.state},{props.country}
            </p>
          </Col>
          <Col xs="auto">
            {props.apply && (
              <Button
                onClick={applyJob}
                size="large"
                style={{
                  marginTop: "45%",
                  marginRight: "5%",
                  float: "center",
                  backgroundColor: "#AFD275"
                }}
              >
                Apply
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="9">
            <Typography
              gutterBottom
              fontWeight="fontWeightMedium"
              component="h2"
            >
              <br />
              <br />
              {props.description}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              imperdiet, nulla et dictum interdum, nisi lorem egestas odio,
              vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est,
              ultrices nec congue eget, auctor vitae massa. Fusce luctus
              vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed
              ornare eu, lobortis in odio. Praesent convallis urna a lacus
              interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed
              ullamcorper ipsum dignissim ac...
            </Typography>
          </Col>
          <Col
            xs="3"
            style={{ borderLeftStyle: "solid", borderColor: "#7e685A" }}
          >
            <div>
              <Typography gutterBottom variant="body1" component="h2">
                What Industry: {props.industry}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                Job Domain: {props.domain}
              </Typography>
              <Typography gutterBottom variant="body1" component="h2">
                What Function you will perform? {props.function}
              </Typography>
              <Typography gutterBottom variant="body1" component="h2">
                Job Type: {props.jobType}
              </Typography>
              <Typography gutterBottom variant="body1" component="h2">
                Job Type:
                {props.jobType}
              </Typography>
            </div>
          </Col>
        </Row>
      </CardContent>
      <CardActions></CardActions>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openComp}
          onClose={handleCloseCompany}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={openComp}>
            <div className={classes.paper}>
              <CompanyPage
                companyName={props.companyName}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    </Card>
  );
}
