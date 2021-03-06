import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProfileDetails from './ProfileDetails'
import DashBoard from './Dashboard'
import UserJobApplications from './UserJobApplications'
import SkillAssessment from './SkillAssessment'
import ChatComponent from './ChatComponent'
import { useCookies } from "react-cookie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >

      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '50vh',
   // minWidth:"25vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function Cont1() {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["userEmail", "userId",'tabValue']);
  const [value, setValue] = React.useState(parseInt(cookies["tabValue"]));
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
    setCookie("tabValue",newValue)
  };
  useEffect(() => {     console.log(cookies["tabValue"])}, [cookies['tabValue']])
  return (
    <div className={classes.root} style={{marginTop:"5.5%",minWidth:"25vh"}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Your DashBoard" {...a11yProps(0)} />
        <Tab label="Profile Details" {...a11yProps(1)} />
        <Tab label="Your Applications" {...a11yProps(2)} />
        <Tab label="Skill Assessment" {...a11yProps(3)} />
        <Tab label="Chat" {...a11yProps(4)} />
        {/* <Tab label="Item Six" {...a11yProps(5)} /> */}
        {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      <TabPanel value={value} index={0} style={{width:"90%"}}>
        <DashBoard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileDetails/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserJobApplications/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SkillAssessment/>
      </TabPanel>
      <TabPanel value={value} index={4}>
         <ChatComponent/>
      </TabPanel>
      {/* <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}
export default Cont1